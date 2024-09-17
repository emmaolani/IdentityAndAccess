import UserAccountProfileApplicationService from "../../../src/application/userAccount/userAccountProfile/userAccountProfileApplicationService";
import NewUserAccountProfileCommand from "../../../src/application/userAccount/userAccountProfile/newUserAccountProfileCommand";
import PhoneNumberValidatorImp from "../../../src/port/util/phoneNumberValidatorImp";
import RepositoryFactoryMock from "../mock/repositoryFactoryMock";
import NewUserAccountProfileCreated from "../../../src/domain/model/userAccount/userAccountProfile/newUserAccountProfileCreated";
import UUIDGenerator from "../../../src/port/adapters/controller/uUIDGenerator";
import UserAccountProfile from "../../../src/domain/model/userAccount/userAccountProfile/userAccountProfile";
import EventName from "../../../src/domain/enum/event/eventName";
import {
  emailAddressError,
  phoneNumberError,
} from "../../../src/domain/enum/errorMsg/contactDetailErrorMsg";
import userAccountProfileRepoError from "../../../src/port/_enums/errorMsg/repositoryErrorMsg/userAccountProfileRepoErrorMsg";
import { userAccountIdError } from "../../../src/domain/enum/errorMsg/userAccountErrorMsg";
import { UserAccountProfileIdError } from "../../../src/domain/enum/errorMsg/userAccountProfileErrorMsg";
import { ITUAndISOSpecRepoErrorMsg } from "../../../src/port/_enums/errorMsg/repositoryErrorMsg/iTuAndISOSpecRepoErrorMsg";
import TestPrerequisiteRepository from "../mock/testPrerequisiteRepository";
import UserAccountRepoErrorMsg from "../../../src/port/_enums/errorMsg/repositoryErrorMsg/userAccountRepoErrorMsg";

describe("UserAccountProfileApplicationService", () => {
  const repositoryFactory = new RepositoryFactoryMock();
  const phoneNumberValidator = new PhoneNumberValidatorImp();
  const userAccountProfileApplicationService =
    new UserAccountProfileApplicationService(
      repositoryFactory,
      phoneNumberValidator
    );

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
        TestPrerequisiteRepository.userAccountProperties.id,
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
        TestPrerequisiteRepository.userAccountProperties.id,
        "test@tester.com",
        "08012345678",
        "NG"
      );

      await storeUserAccountProfileInDb(); // store userAccountProfile in db to simulate conflict in application service

      await expect(
        userAccountProfileApplicationService.createUserAccountProfile(command)
      ).rejects.toThrow(
        userAccountProfileRepoError.userAccountProfileAlreadyExist
      );

      await removeUserAccountProfileFromDb();
    });

    /* This is a rare case; it occurs when phoneNumberValidator those not throw an error this may happen if the
       phoneNumberValidator data file includes a country code that lacks a corresponding ITUAndISOSpec in the database */
    it("it should throw an error if the a valid country code does not have a ITUAndISOSpec in the DB", async () => {
      const command = new NewUserAccountProfileCommand(
        new UUIDGenerator().generate(),
        TestPrerequisiteRepository.userAccountProperties.id,
        "test@tester.com",
        "2234567899",
        "US" // US is a valid country code but does not have a corresponding ITUAndISOSpec in the test database
      );

      await expect(
        userAccountProfileApplicationService.createUserAccountProfile(command)
      ).rejects.toThrow(ITUAndISOSpecRepoErrorMsg.ITUAndISOSpecNotFound);
    });

    // phoneNumberValidator should always validate the phone number before the ITUAndISOSpec is retrieved
    it("should throw error if phoneNumber is invalid", async () => {
      const command = new NewUserAccountProfileCommand(
        new UUIDGenerator().generate(),
        TestPrerequisiteRepository.userAccountProperties.id,
        "test@tester.com",
        "22345678", // invalid mobile number for usa
        "US"
      );

      await expect(
        userAccountProfileApplicationService.createUserAccountProfile(command)
      ).rejects.toThrow(phoneNumberError.invalidPhoneNumber);
    });

    it("should throw error if email is invalid", async () => {
      const command = new NewUserAccountProfileCommand(
        new UUIDGenerator().generate(),
        TestPrerequisiteRepository.userAccountProperties.id,
        "testTester.com", // invalid email
        "08112345678",
        "NG"
      );

      await expect(
        userAccountProfileApplicationService.createUserAccountProfile(command)
      ).rejects.toThrow(emailAddressError.invalidEmail);
    });

    it("should throw an error if userAccount is not found in db", async () => {
      const command = new NewUserAccountProfileCommand(
        "invalid Id",
        TestPrerequisiteRepository.userAccountProperties.id,
        "test@tester.com",
        "08112345678",
        "NG"
      );

      removePrerequisiteUserAccountFromDB();

      await expect(
        userAccountProfileApplicationService.createUserAccountProfile(command)
      ).rejects.toThrow(UserAccountRepoErrorMsg.UserAccountNotFound);

      addPrerequisiteUserAccountToDB();
    });

    it("should throw error if userAccountProfile id is not of format UUID v4", async () => {
      const command = new NewUserAccountProfileCommand(
        "invalid Id",
        TestPrerequisiteRepository.userAccountProperties.id,
        "test@tester.com",
        "08112345678",
        "NG"
      );

      await expect(
        userAccountProfileApplicationService.createUserAccountProfile(command)
      ).rejects.toThrow(UserAccountProfileIdError.invalidUUID);
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

    function storeUserAccountProfileInDb() {
      const testPrerequisiteRepository =
        repositoryFactory.getTestPrerequisiteRepository();

      testPrerequisiteRepository.savePrerequisiteObjects("userAccountProfile");
    }

    function removeUserAccountProfileFromDb() {
      const testPrerequisiteRepository =
        repositoryFactory.getTestPrerequisiteRepository();

      testPrerequisiteRepository.removePrerequisiteObjects(
        "userAccountProfile"
      );
    }

    function removePrerequisiteUserAccountFromDB() {
      const testPrerequisiteRepository =
        repositoryFactory.getTestPrerequisiteRepository();

      testPrerequisiteRepository.removePrerequisiteObjects("userAccount");
    }

    function addPrerequisiteUserAccountToDB() {
      const testPrerequisiteRepository =
        repositoryFactory.getTestPrerequisiteRepository();

      testPrerequisiteRepository.savePrerequisiteObjects("userAccount");
    }
  });
});