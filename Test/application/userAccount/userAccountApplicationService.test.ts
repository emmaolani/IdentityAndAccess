import UserAccountApplicationService from "../../../src/application/userAccount/userAccountApplicationService";
import NewUserAccountCommand from "../../../src/application/userAccount/newUserAccountCommand";
import RepositoryFactoryMock from "../mock/repositoryFactoryMock";
import DomainEvent from "../../../src/domain/domainEvent";
import UserAccount from "../../../src/domain/model/userAccount/userAccount";
import NewUserAccountCreated from "../../../src/domain/model/userAccount/newUserAccountCreated";
import EventName from "../../../src/domain/eventName";
import { userAccountErrorMsg } from "../../../src/domain/model/userAccount/userAccountErrorMsg";
import UUIDGenerator from "../../../src/port/util/uUIDGenerator";
import TestPrerequisiteRepository from "../mock/testPrerequisiteRepository";
import UserAccountRepoErrorMsg from "../../../src/port/adapters/persistance/repositoryErrorMsg/userAccountRepoErrorMsg";

describe("UserAccountApplicationService", () => {
  const repositoryFactory = new RepositoryFactoryMock();
  const userAccountApplicationService = new UserAccountApplicationService(
    repositoryFactory
  );

  beforeAll(() => {
    const testPrerequisiteRepository =
      repositoryFactory.getTestPrerequisiteRepository();

    testPrerequisiteRepository.savePrerequisiteObjects(
      "authenticationMethod",
      "restriction"
    );
  });

  describe("createUserAccount", () => {
    it("should create and store new userAccount and NewUserAccountCreated Event if there is no username conflict", async () => {
      const newUserAccountCommand = new NewUserAccountCommand(
        new UUIDGenerator().generate(),
        "username",
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
      expect(userAccount["authenticationMethodId"]["id"]).toBe(
        TestPrerequisiteRepository.authenticationMethodProperties.id
      );
      expect(userAccount["restrictionId"]["id"]).toBe(
        TestPrerequisiteRepository.restrictionProperties.id
      );
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
        TestPrerequisiteRepository.userAccountProperties.username,
        TestPrerequisiteRepository.userAccountProperties.password
      );

      storeUserAccountInDB(); // store the user account in the database to simulate a conflict in application service

      await expect(
        userAccountApplicationService.createUserAccount(newUserAccountCommand)
      ).rejects.toThrow(UserAccountRepoErrorMsg.UserAccountAlreadyExists);

      removeUserAccountInDB();
    });

    it("should throw an error if the argument is not UUID v4 format", async () => {
      const newUserAccountCommand = new NewUserAccountCommand(
        "invalidUUID",
        "tester3",
        "SecureP@ss123"
      );

      await expect(
        userAccountApplicationService.createUserAccount(newUserAccountCommand)
      ).rejects.toThrow(userAccountErrorMsg.invalidUUID);
    });

    it("should throw an error if the username does not meet the requirements", async () => {
      const command = new NewUserAccountCommand(
        new UUIDGenerator().generate(),
        "invalid+tester4",
        "SecureP@ss123"
      );

      await expect(
        userAccountApplicationService.createUserAccount(command)
      ).rejects.toThrow(userAccountErrorMsg.userNameNotMeetingRequirements);
    });

    it("should throw an error if the password does not meet the requirements", async () => {
      const newUserAccountCommand = new NewUserAccountCommand(
        new UUIDGenerator().generate(),
        "tester5",
        "invalidPassword"
      );

      await expect(
        userAccountApplicationService.createUserAccount(newUserAccountCommand)
      ).rejects.toThrow(userAccountErrorMsg.passwordNotMeetingRequirements);
    });

    function storeUserAccountInDB() {
      const testPrerequisiteRepository =
        repositoryFactory.getTestPrerequisiteRepository();

      testPrerequisiteRepository.savePrerequisiteObjects("userAccount");
    }

    function removeUserAccountInDB() {
      const testPrerequisiteRepository =
        repositoryFactory.getTestPrerequisiteRepository();

      testPrerequisiteRepository.removePrerequisiteObjects("userAccount");
    }
  });
});
