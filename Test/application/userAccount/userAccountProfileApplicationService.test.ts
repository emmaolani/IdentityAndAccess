import UserAccountProfileApplicationService from "../../../src/application/userAccount/userAccountProfile/userAccountProfileApplicationService";
import NewUserAccountProfileCommand from "../../../src/application/userAccount/userAccountProfile/newUserAccountProfileCommand";
import RepositoryFactoryMock from "../mock/repositoryFactoryMock";
import NewUserAccountProfileCreated from "../../../src/domain/model/userAccount/userAccountProfile/newUserAccountProfileCreated";
import UUIDGenerator from "../../../src/port/util/uUIDGenerator";
import UserAccountProfile from "../../../src/domain/model/userAccount/userAccountProfile/userAccountProfile";
import EventName from "../../../src/domain/eventName";
import { contactDetailErrorMsg } from "../../../src/domain/model/contactDetails/contactDetailErrorMsg";
import userAccountProfileRepoError from "../../../src/port/adapters/persistance/repositoryErrorMsg/userAccountProfileRepoErrorMsg";
import { UserAccountProfileErrorMsg } from "../../../src/domain/model/userAccount/userAccountProfile/userAccountProfileErrorMsg";
import { ITUAndISOSpecRepoErrorMsg } from "../../../src/port/adapters/persistance/repositoryErrorMsg/iTuAndISOSpecRepoErrorMsg";
import TestPrerequisiteData from "../mock/testPrerequisiteData";
import { prerequisiteObjects } from "../mock/testPrerequisiteRepository";
import UserAccountRepoErrorMsg from "../../../src/port/adapters/persistance/repositoryErrorMsg/userAccountRepoErrorMsg";

describe("UserAccountProfileApplicationService", () => {
  const repositoryFactory = new RepositoryFactoryMock();
  const userAccountProfileApplicationService =
    new UserAccountProfileApplicationService(repositoryFactory);

  describe("createUserAccountProfile", () => {
    beforeAll(async () => {
      const testPrerequisiteRepository =
        repositoryFactory.getTestPrerequisiteRepository();

      testPrerequisiteRepository.savePrerequisiteObjects(
        "ITUAndISOSpec",
        "userAccount"
      );
    });

    it("should create and store userAccountProfile with published NewUserAccountProfileCreated event", async () => {
      const command = new NewUserAccountProfileCommand(
        new UUIDGenerator().generate(),
        TestPrerequisiteData.userAccountProperties.id,
        "test@tester.com",
        "08012345678",
        "NG"
      );

      await userAccountProfileApplicationService.createUserAccountProfile(
        command
      );

      const { userAccountProfile, events } =
        await retrieveUserAccountProfileAndEventStored(command);

      assertThatPropertiesIn_userAccountProfile_match(
        userAccountProfile,
        command
      );

      assertThatEventIsPublishedWithCorrectProperties(
        events[0],
        userAccountProfile
      );
    });

    it("should throw error if userAccountProfile with userAccountId already exists", async () => {
      const command = new NewUserAccountProfileCommand(
        new UUIDGenerator().generate(),
        TestPrerequisiteData.userAccountProperties.id,
        "test@tester.com",
        "08012345678",
        "NG"
      );

      add("userAccountProfile"); // store userAccountProfile in db to simulate conflict in application service

      await expect(
        userAccountProfileApplicationService.createUserAccountProfile(command)
      ).rejects.toThrow(userAccountProfileRepoError.conflict);

      remove("userAccountProfile");
    });

    /* This is a rare case; it occurs when phoneNumberValidator those not throw an error this may happen if the
       phoneNumberValidator data file includes a country code that lacks a corresponding ITUAndISOSpec in the database */
    it("it should throw an error if the a valid country code does not have a ITUAndISOSpec in the DB", async () => {
      const command = new NewUserAccountProfileCommand(
        new UUIDGenerator().generate(),
        TestPrerequisiteData.userAccountProperties.id,
        "test@tester.com",
        "2234567899",
        "US" // US is a valid country code but does not have a corresponding ITUAndISOSpec in the test database
      );

      await expect(
        userAccountProfileApplicationService.createUserAccountProfile(command)
      ).rejects.toThrow(ITUAndISOSpecRepoErrorMsg.notFound);
    });

    // phoneNumberValidator should always validate the phone number before the ITUAndISOSpec is retrieved
    it("should throw error if phoneNumber is invalid", async () => {
      const command = new NewUserAccountProfileCommand(
        new UUIDGenerator().generate(),
        TestPrerequisiteData.userAccountProperties.id,
        "test@tester.com",
        "22345678", // invalid mobile number for usa
        "US"
      );

      await expect(
        userAccountProfileApplicationService.createUserAccountProfile(command)
      ).rejects.toThrow(contactDetailErrorMsg.invalidPhoneNumber);
    });

    it("should throw error if email is invalid", async () => {
      const command = new NewUserAccountProfileCommand(
        new UUIDGenerator().generate(),
        TestPrerequisiteData.userAccountProperties.id,
        "testTester.com", // invalid email
        "08112345678",
        "NG"
      );

      await expect(
        userAccountProfileApplicationService.createUserAccountProfile(command)
      ).rejects.toThrow(contactDetailErrorMsg.invalidEmail);
    });

    it("should throw an error if userAccount is not found in db", async () => {
      const command = new NewUserAccountProfileCommand(
        new UUIDGenerator().generate(),
        TestPrerequisiteData.userAccountProperties.id,
        "test@tester.com",
        "08112345678",
        "NG"
      );

      remove("userAccount");

      await expect(
        userAccountProfileApplicationService.createUserAccountProfile(command)
      ).rejects.toThrow(UserAccountRepoErrorMsg.notFound);

      add("userAccount");
    });

    it("should throw error if userAccountProfile id is not of format UUID v4", async () => {
      const command = new NewUserAccountProfileCommand(
        "invalid Id",
        TestPrerequisiteData.userAccountProperties.id,
        "test@tester.com",
        "08112345678",
        "NG"
      );

      await expect(
        userAccountProfileApplicationService.createUserAccountProfile(command)
      ).rejects.toThrow(UserAccountProfileErrorMsg.invalidUUID);
    });

    async function retrieveUserAccountProfileAndEventStored(
      command: NewUserAccountProfileCommand
    ) {
      const repositories = repositoryFactory.getRepositories(
        "UserAccountProfileRepository",
        "EventStore"
      );

      const userAccountProfile =
        await repositories.UserAccountProfileRepository.getById(
          command.getUserProfileId()
        );
      const events = (await repositories.EventStore.getAllEventWithName(
        EventName.NewUserAccountProfileCreated
      )) as NewUserAccountProfileCreated[];

      return { userAccountProfile, events };
    }

    function assertThatPropertiesIn_userAccountProfile_match(
      aUserAccountProfile: UserAccountProfile,
      aCommand: NewUserAccountProfileCommand
    ) {
      expect(aUserAccountProfile).toBeInstanceOf(UserAccountProfile);
      expect(aUserAccountProfile.getId()).toBe(aCommand.getUserProfileId());
      expect(aUserAccountProfile["userAccountId"]["id"]).toBe(
        aCommand.getUserAccountId()
      );
      expect(aUserAccountProfile["emailAddress"].getValue()).toBe(
        aCommand.getEmailAddress()
      );
      expect(aUserAccountProfile["phoneNumber"].getValue()).toBe(
        aCommand.getPhoneNumber().number.slice(1) // phoneNumber is stored without the calling code or national prefix
      );
    }

    function assertThatEventIsPublishedWithCorrectProperties(
      aEvent: NewUserAccountProfileCreated,
      aUserAccountProfile: UserAccountProfile
    ) {
      expect(aEvent).toBeInstanceOf(NewUserAccountProfileCreated);
      expect(aEvent["userAccountProfileId"]).toBe(aUserAccountProfile.getId());
      expect(aEvent["userAccountId"]).toBe(
        aUserAccountProfile["userAccountId"].getId()
      );
    }

    function add(anObjectName: prerequisiteObjects) {
      const testPrerequisiteRepository =
        repositoryFactory.getTestPrerequisiteRepository();

      testPrerequisiteRepository.savePrerequisiteObjects(anObjectName);
    }

    function remove(anObjectName: prerequisiteObjects) {
      const testPrerequisiteRepository =
        repositoryFactory.getTestPrerequisiteRepository();

      testPrerequisiteRepository.removePrerequisiteObjects(anObjectName);
    }
  });
});
