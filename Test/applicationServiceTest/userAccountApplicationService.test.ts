import UserAccountApplicationService from "../../src/application/identity/userAccount/userAccountApplicationService";
import NewUserAccountCommand from "../../src/application/identity/userAccount/newUserAccountCommand";
import UserAccount from "../../src/domain/model/identity/userAccount/userAccount";
import NewUserAccountCreated from "../../src/domain/model/identity/userAccount/newUserAccountCreated";
import RepositoryFactoryMock from "./mock/repositoryFactoryMock";
import UserAccountRepositoryMock from "./mock/userAccountRepositoryMock";
import EventStoreMock from "./mock/eventStoreMock";
import UUIDGenerator from "../../src/port/adapters/controller/uUIDGenerator";

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

  beforeEach(() => {
    userAccountRepository.clear();
    eventStore.clear();
  });

  it("should create a new userAccount and NewUserAccountCreated Event if there is no username conflict", () => {
    userAccountRepository.setDoesUserAccountExist(false); // Set the user account to not exist

    const newUserAccountCommand = new NewUserAccountCommand(
      new UUIDGenerator().generate(),
      "username",
      "SecureP@ss123"
    );

    userAccountApplicationService.createUserAccount(newUserAccountCommand);

    expect(userAccountRepository.getUserAccount("username")).toBeInstanceOf(
      UserAccount
    );
    expect(eventStore.getAllStoredEvents()).toBeInstanceOf(
      NewUserAccountCreated
    );
  });

  it("should create a userAccount with an active status of false", () => {
    userAccountRepository.setDoesUserAccountExist(false);

    const newUserAccountCommand = new NewUserAccountCommand(
      new UUIDGenerator().generate(),
      "username",
      "SecureP@ss123"
    );

    userAccountApplicationService.createUserAccount(newUserAccountCommand);

    const userAccount = userAccountRepository.getUserAccount("username");

    expect(() => {
      if (userAccount) {
        userAccount.validate("username", "SecureP@ss123");
      }
    }).toThrow("User account is not active");
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
      "invalidUsername",
      "SecureP@ss123"
    );

    expect(() => {
      userAccountApplicationService.createUserAccount(newUserAccountCommand);
    }).toThrow("Invalid UUID");
  });

  it("should throw an error if the username does not meet the requirements", () => {
    userAccountRepository.setDoesUserAccountExist(false);

    const newUserAccountCommand = new NewUserAccountCommand(
      new UUIDGenerator().generate(),
      "invalid+username",
      "SecureP@ss123"
    );

    expect(() =>
      userAccountApplicationService.createUserAccount(newUserAccountCommand)
    ).toThrow("Username does not meet requirements");
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
    ).toThrow("password does not meet security requirements");
  });
});
