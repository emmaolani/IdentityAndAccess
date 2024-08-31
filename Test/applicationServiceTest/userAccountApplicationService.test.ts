import UserAccountApplicationService from "../../src/application/identity/userAccount/userAccountApplicationService";
import NewUserAccountCommand from "../../src/application/identity/userAccount/newUserAccountCommand";
import UserAccount from "../../src/domain/model/identity/userAccount/userAccount";
import NewUserAccountCreated from "../../src/domain/model/identity/userAccount/newUserAccountCreated";
import RepositoryFactoryMock from "./mock/repositoryFactoryMock";
import UserAccountRepositoryMock from "./mock/userAccountRepositoryMock";
import EventStoreMock from "./mock/eventStoreMock";
import UUIDGenerator from "../../src/port/adapters/controller/uUIDGenerator";
import DomainEvent from "../../src/domain/domainEvent";
import {
  passwordError,
  userAccountError,
  userAccountIdError,
  userNamesError,
} from "../../src/domain/enum/errors/errorMsg";

describe("User Account Application Service", () => {
  const userAccountRepository = new UserAccountRepositoryMock();
  const eventStore = new EventStoreMock();
  const repositoryFactory = new RepositoryFactoryMock(
    userAccountRepository,
    eventStore
  );
  const userAccountApplicationService = new UserAccountApplicationService(
    repositoryFactory
  );
  let userAccount: UserAccount;
  let event: DomainEvent;

  beforeEach(() => {
    userAccountRepository.reset();
    eventStore.reset();
  });

  it("should create a new userAccount and NewUserAccountCreated Event if there is no username conflict", () => {
    userAccountRepository.setDoesUserAccountExist(false); // Set the user account to not exist
    const id: string = new UUIDGenerator().generate();
    const username: string = "tester";
    const password: string = "SecureP@ss1233";

    const newUserAccountCommand = new NewUserAccountCommand(
      id,
      username,
      password
    );

    userAccountApplicationService.createUserAccount(newUserAccountCommand);

    userAccount = userAccountRepository.getUserAccount("username");
    event = eventStore.getAllStoredEvents();

    assertThatPropertiesIn_userAccount_match(id, username, password);
    assertThatPropertiesIn_newUserAccountCreated_match(id, username);
  });

  function assertThatPropertiesIn_userAccount_match(
    id: string,
    username: string,
    password: string
  ) {
    expect(userAccount).toBeInstanceOf(UserAccount);
    expect(userAccount["id"]["value"]).toBe(id);
    expect(userAccount["username"]["value"]).toBe(username);
    expect(userAccount["password"]["value"]).toBe(password);
  }

  function assertThatPropertiesIn_newUserAccountCreated_match(
    id: string,
    username: string
  ) {
    expect(event).toBeInstanceOf(NewUserAccountCreated);
    if (event instanceof NewUserAccountCreated) {
      expect(event["userAccountId"]).toBe(id);
      expect(event["userName"]).toBe(username);
    }
  }

  it("should create a userAccount with an active status of false", () => {
    userAccountRepository.setDoesUserAccountExist(false);

    const id: string = new UUIDGenerator().generate();
    const username: string = "tester";
    const password: string = "SecureP@ss1233";

    const newUserAccountCommand = new NewUserAccountCommand(
      id,
      username,
      password
    );

    userAccountApplicationService.createUserAccount(newUserAccountCommand);

    userAccount = userAccountRepository.getUserAccount("username");

    expect(userAccount.getActiveStatus()).toBe(false);
  });

  it("should throw an error if there is a username conflict", () => {
    userAccountRepository.setDoesUserAccountExist(true); // Set to true to simulate a username conflict

    const newUserAccountCommand = new NewUserAccountCommand(
      new UUIDGenerator().generate(),
      "username",
      "SecureP@ss123"
    );

    expect(() =>
      userAccountApplicationService.createUserAccount(newUserAccountCommand)
    ).toThrow("User account already exists");
  });

  it("should throw an error if the argument is not UUID v4 format", () => {
    userAccountRepository.setDoesUserAccountExist(false);

    const newUserAccountCommand = new NewUserAccountCommand(
      "invalidUUID",
      "username",
      "SecureP@ss123"
    );

    expect(() => {
      userAccountApplicationService.createUserAccount(newUserAccountCommand);
    }).toThrow(userAccountIdError.invalidUUID);
  });

  it("should throw an error if the username does not meet the requirements", () => {
    userAccountRepository.setDoesUserAccountExist(true); // Set to true to simulate a username conflict (should not be reached)

    const newUserAccountCommand = new NewUserAccountCommand(
      new UUIDGenerator().generate(),
      "invalid+username",
      "SecureP@ss123"
    );

    expect(() =>
      userAccountApplicationService.createUserAccount(newUserAccountCommand)
    ).toThrow(userNamesError.userNameNotMeetingRequirements);
  });

  it("should throw an error if the password does not meet the requirements", () => {
    userAccountRepository.setDoesUserAccountExist(false);

    const newUserAccountCommand = new NewUserAccountCommand(
      new UUIDGenerator().generate(),
      "username",
      "invalidPassword"
    );

    expect(() =>
      userAccountApplicationService.createUserAccount(newUserAccountCommand)
    ).toThrow(passwordError.passwordNotMeetingRequirements);
  });
});
