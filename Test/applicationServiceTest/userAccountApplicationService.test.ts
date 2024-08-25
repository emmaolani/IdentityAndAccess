import UserAccountApplicationService from "../../src/application/identity/userAccount/userAccountApplicationService";
import NewUserAccountCommand from "../../src/application/identity/userAccount/newUserAccountCommand";
import UserAccount from "../../src/domain/model/identity/userAccount/userAccount";
import NewUserAccountCreated from "../../src/domain/model/identity/userAccount/newUserAccountCreated";
import RepositoryFactoryMock from "./mock/repositoryFactoryMock";
import UserAccountRepositoryMock from "./mock/userAccountRepositoryMock";
import EventStoreMock from "./mock/eventStoreMock";

describe("User Account Application Service", () => {
  const userAccountRepository = new UserAccountRepositoryMock();
  const eventStore = new EventStoreMock();
  const repositoryFactory = new RepositoryFactoryMock(
    userAccountRepository,
    eventStore
  );

  beforeEach(() => {
    userAccountRepository.clear();
    eventStore.clear();
  });

  it("should create a new userAccount and NewUserAccountCreatedEvent if there is no username conflict", () => {
    const newUserAccountCommand = new NewUserAccountCommand(
      "123",
      "username",
      "SecureP@ss123"
    );
    const userAccountApplicationService = new UserAccountApplicationService(
      repositoryFactory
    );

    userAccountRepository.setDoesUserAccountExist(false);

    userAccountApplicationService.createUserAccount(newUserAccountCommand);

    expect(userAccountRepository.doesUserAccountExist("username")).toBe(false);
    expect(userAccountRepository.getUserAccount("username")).toBeInstanceOf(
      UserAccount
    );
    expect(eventStore.getAllStoredEvents()).toBeInstanceOf(
      NewUserAccountCreated
    );
  });

  it("should throw an error if there is a username conflict", () => {
    userAccountRepository.setDoesUserAccountExist(true);

    const newUserAccountCommand = new NewUserAccountCommand(
      "123",
      "username",
      "SecureP@ss123"
    );
    const userAccountApplicationService = new UserAccountApplicationService(
      repositoryFactory
    );

    expect(() =>
      userAccountApplicationService.createUserAccount(newUserAccountCommand)
    ).toThrow("User account already exists");
  });

  it("should throw an error if the username does not meet the requirements", () => {
    userAccountRepository.setDoesUserAccountExist(false);

    const newUserAccountCommand = new NewUserAccountCommand(
      "123",
      "invalid+username",
      "SecureP@ss123"
    );
    const userAccountApplicationService = new UserAccountApplicationService(
      repositoryFactory
    );

    expect(() =>
      userAccountApplicationService.createUserAccount(newUserAccountCommand)
    ).toThrow("Username does not meet requirements");
  });

  it("should throw an error if the password does not meet the requirements", () => {
    userAccountRepository.setDoesUserAccountExist(false);

    const newUserAccountCommand = new NewUserAccountCommand(
      "123",
      "username",
      "invalidPassword"
    );
    const userAccountApplicationService = new UserAccountApplicationService(
      repositoryFactory
    );

    expect(() =>
      userAccountApplicationService.createUserAccount(newUserAccountCommand)
    ).toThrow("password does not meet security requirements");
  });
});
