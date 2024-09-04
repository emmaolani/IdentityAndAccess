import UserAccountApplicationService from "../../../src/application/identity/userAccountApplicationService";
import NewUserAccountCommand from "../../../src/application/identity/newUserAccountCommand";
import UserAccount from "../../../src/domain/model/identity/userAccount/userAccount";
import NewUserAccountCreated from "../../../src/domain/model/identity/userAccount/newUserAccountCreated";
import RepositoryFactoryMock from "../mock/repositoryFactoryMock";
import UserAccountRepositoryMock from "../mock/userAccountRepositoryMock";
import EventStoreMock from "../mock/eventStoreMock";
import UUIDGenerator from "../../../src/port/adapters/controller/uUIDGenerator";
import DomainEvent from "../../../src/domain/domainEvent";
import {
  passwordError,
  userAccountIdError,
  userNamesError,
} from "../../../src/domain/enum/errors/errorMsg";

describe("User Account Application Service", () => {
  const repositoryFactory = new RepositoryFactoryMock();
  const userAccountApplicationService = new UserAccountApplicationService(
    repositoryFactory
  );
  let userAccount: UserAccount;
  let event: DomainEvent;

  beforeEach(() => {
    repositoryFactory.reset();
  });

  it("should create a new userAccount and NewUserAccountCreated Event if there is no username conflict", async () => {
    const id: string = new UUIDGenerator().generate();
    const username: string = "tester";
    const password: string = "SecureP@ss1233";

    const newUserAccountCommand = new NewUserAccountCommand(
      id,
      username,
      password
    );

    await userAccountApplicationService.createUserAccount(
      newUserAccountCommand
    );

    // retrieving all repos used by UserAccountApplicationService
    const repositories = repositoryFactory.getRepositoriesUsed();

    const userAccountRepository =
      repositories?.UserAccountRepository as UserAccountRepositoryMock;
    const eventStore = repositories?.EventStore as EventStoreMock;

    userAccount = userAccountRepository.getNewlyCreatedUserAccount();
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

  it("should throw an error if there is a username conflict", async () => {
    repositoryFactory.set_doesUserAccountExist_InUserAccountRepoTo(true); // Set to true to simulate a username conflict in userAccountRepository

    const newUserAccountCommand = new NewUserAccountCommand(
      new UUIDGenerator().generate(),
      "username",
      "SecureP@ss123"
    );

    await expect(
      userAccountApplicationService.createUserAccount(newUserAccountCommand)
    ).rejects.toThrow("User account already exists");
  });

  it("should throw an error if the argument is not UUID v4 format", async () => {
    const newUserAccountCommand = new NewUserAccountCommand(
      "invalidUUID",
      "username",
      "SecureP@ss123"
    );

    await expect(
      userAccountApplicationService.createUserAccount(newUserAccountCommand)
    ).rejects.toThrow(userAccountIdError.invalidUUID);
  });

  it("should throw an error if the username does not meet the requirements", async () => {
    repositoryFactory.set_doesUserAccountExist_InUserAccountRepoTo(true); // Set to true to simulate a username conflict (should not be reached)

    const newUserAccountCommand = new NewUserAccountCommand(
      new UUIDGenerator().generate(),
      "invalid+username",
      "SecureP@ss123"
    );

    await expect(
      userAccountApplicationService.createUserAccount(newUserAccountCommand)
    ).rejects.toThrow(userNamesError.userNameNotMeetingRequirements);
  });

  it("should throw an error if the password does not meet the requirements", async () => {
    const newUserAccountCommand = new NewUserAccountCommand(
      new UUIDGenerator().generate(),
      "username",
      "invalidPassword"
    );

    await expect(
      userAccountApplicationService.createUserAccount(newUserAccountCommand)
    ).rejects.toThrow(passwordError.passwordNotMeetingRequirements);
  });
});
