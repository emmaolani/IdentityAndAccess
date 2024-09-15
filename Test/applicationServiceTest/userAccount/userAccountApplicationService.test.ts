import UserAccountApplicationService from "../../../src/application/userAccount/userAccountApplicationService";
import NewUserAccountCommand from "../../../src/application/userAccount/newUserAccountCommand";
import RepositoryFactoryMock from "../mock/repositoryFactoryMock";
import DomainEvent from "../../../src/domain/domainEvent";
import UserAccount from "../../../src/domain/model/userAccount/userAccount";
import UserAccountId from "../../../src/domain/model/userAccount/userAccountId";
import UserName from "../../../src/domain/model/userAccount/userName";
import Password from "../../../src/domain/model/userAccount/password";
import NewUserAccountCreated from "../../../src/domain/model/userAccount/newUserAccountCreated";
import EventName from "../../../src/domain/enum/event/eventName";
import {
  passwordError,
  userAccountIdError,
  userNamesError,
} from "../../../src/domain/enum/errorMsg/userAccountErrorMsg";
import UUIDGenerator from "../../../src/port/adapters/controller/uUIDGenerator";

describe("User Account Application Service", () => {
  const repositoryFactory = new RepositoryFactoryMock();
  const userAccountApplicationService = new UserAccountApplicationService(
    repositoryFactory
  );

  it("should create and store new userAccount and NewUserAccountCreated Event if there is no username conflict", async () => {
    const newUserAccountCommand = new NewUserAccountCommand(
      new UUIDGenerator().generate(),
      "tester1",
      "SecureP@ss1233"
    );

    await userAccountApplicationService.createUserAccount(
      newUserAccountCommand
    );

    const { userAccount, events } = await retrieveUserAccountAndEventStored(
      newUserAccountCommand
    );

    assertThatPropertiesIn_userAccount_match(
      userAccount,
      newUserAccountCommand
    );
    assertThatPropertiesIn_newUserAccountCreated_match(
      events[0],
      newUserAccountCommand
    );
  });

  async function retrieveUserAccountAndEventStored(
    command: NewUserAccountCommand
  ) {
    const repositories = repositoryFactory.getRepositories(
      "UserAccountRepository",
      "EventStore"
    );

    const userAccount = await repositories.UserAccountRepository.getById(
      command.getId()
    );
    const events = (await repositories.EventStore.getAllEventWithName(
      EventName.NewUserAccountCreated
    )) as NewUserAccountCreated[];

    return { userAccount, events };
  }

  function assertThatPropertiesIn_userAccount_match(
    userAccount: UserAccount,
    aCommand: NewUserAccountCommand
  ) {
    expect(userAccount).toBeInstanceOf(UserAccount);
    expect(userAccount["id"]["id"]).toBe(aCommand.getId());
    expect(userAccount["username"]["value"]).toBe(aCommand.getUsername());
    expect(userAccount["password"]["value"]).toBe(aCommand.getPassword());
  }

  function assertThatPropertiesIn_newUserAccountCreated_match(
    event: DomainEvent,
    aCommand: NewUserAccountCommand
  ) {
    expect(event).toBeInstanceOf(NewUserAccountCreated);

    if (event instanceof NewUserAccountCreated) {
      expect(event["userAccountId"]).toBe(aCommand.getId());
      expect(event["userName"]).toBe(aCommand.getUsername());
    }
  }

  it("should throw an error if there is a username conflict", async () => {
    const newUserAccountCommand = new NewUserAccountCommand(
      new UUIDGenerator().generate(),
      "tester2",
      "SecureP@ss123"
    );

    await storeUserAccountInDB(newUserAccountCommand); // store the user account in the database to simulate a conflict in application service

    await expect(
      userAccountApplicationService.createUserAccount(newUserAccountCommand)
    ).rejects.toThrow("User account already exists");

    await removeUserAccountInDB(newUserAccountCommand);
  });

  it("should throw an error if the argument is not UUID v4 format", async () => {
    const newUserAccountCommand = new NewUserAccountCommand(
      "invalidUUID",
      "tester3",
      "SecureP@ss123"
    );

    await expect(
      userAccountApplicationService.createUserAccount(newUserAccountCommand)
    ).rejects.toThrow(userAccountIdError.invalidUUID);
  });

  it("should throw an error if the username does not meet the requirements", async () => {
    const command = new NewUserAccountCommand(
      new UUIDGenerator().generate(),
      "invalid+tester4",
      "SecureP@ss123"
    );

    await expect(
      userAccountApplicationService.createUserAccount(command)
    ).rejects.toThrow(userNamesError.userNameNotMeetingRequirements);
  });

  it("should throw an error if the password does not meet the requirements", async () => {
    const newUserAccountCommand = new NewUserAccountCommand(
      new UUIDGenerator().generate(),
      "tester5",
      "invalidPassword"
    );

    await expect(
      userAccountApplicationService.createUserAccount(newUserAccountCommand)
    ).rejects.toThrow(passwordError.passwordNotMeetingRequirements);
  });

  async function storeUserAccountInDB(aCommand: NewUserAccountCommand) {
    const repositories = repositoryFactory.getRepositories(
      "UserAccountRepository"
    );

    await repositories.UserAccountRepository.save(
      new UserAccount(
        new UserAccountId(aCommand.getId()),
        new UserName(aCommand.getUsername()),
        new Password(aCommand.getPassword())
      )
    );
  }

  async function removeUserAccountInDB(aCommand: NewUserAccountCommand) {
    const repositories = repositoryFactory.getRepositories(
      "UserAccountRepository"
    );

    await repositories.UserAccountRepository.remove(aCommand.getUsername());
  }
});
