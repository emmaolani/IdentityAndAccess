import UserAccountProfileApplicationService from "../../../src/application/identity/userAccountProfile/userAccountProfileApplicationService";
import NewUserAccountProfileCommand from "../../../src/application/identity/userAccountProfile/newUserAccountProfileCommand";
import PhoneNumberValidatorImp from "../../../src/port/util/phoneNumberValidatorImp";
import RepositoryFactoryMock from "../mock/repositoryFactoryMock";
import UserAccountProfile from "../../../src/domain/model/identity/userAccount/userAccountProfile/userAccountProfile";
import NewUserAccountProfileCreated from "../../../src/domain/model/identity/userAccount/userAccountProfile/newUserAccountProfileCreated";
import UUIDGenerator from "../../../src/port/adapters/controller/uUIDGenerator";
import UserAccountProfileApplicationServiceError from "../../../src/application/errorMsg/userAccountProfileApplicationServiceerrorMsg";
import {
  emailAddressError,
  phoneNumberError,
} from "../../../src/domain/enum/errorMsg/contactDetailErrorMsg";
import { userAccountIdError } from "../../../src/domain/enum/errorMsg/userAccountErrorMsg";
import { UserAccountProfileIdError } from "../../../src/domain/enum/errorMsg/userAccountProfileErrorMsg";
import { ITUAndISOSpecRepoErrorMsg } from "../../../src/port/_enums/errorMsg/repositories/repositoryErrorMsg/iTuAndISOSpecRepoErrorMsg";
import UserAccountProfileId from "../../../src/domain/model/identity/userAccount/userAccountProfile/userAccountProfileId";
import UserAccountId from "../../../src/domain/model/identity/userAccount/userAccountId";
import EmailAddress from "../../../src/domain/model/contactDetails/emailAddress";
import PhoneNumber from "../../../src/domain/model/contactDetails/phoneNumber";
import ITUAndISOSpec from "../../../src/domain/model/geographicEntities/ITUAndISOSpec";
import ITUAndISOSpecId from "../../../src/domain/model/geographicEntities/ITUAndISOSpecId";
import EventName from "../../../src/domain/enum/event/eventName";

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
      await addDefaultITUAndISOSpecToDb();
    });

    it("should create a userAccountProfile and publish NewUserAccountProfileCreated event", async () => {
      const command = createNewUserAccountProfileCommand(
        new UUIDGenerator().generate(),
        new UUIDGenerator().generate(),
        "test@tester.com",
        "08012345678",
        "NG"
      );

      await userAccountProfileApplicationService.createUserAccountProfile(
        command
      );

      const { userAccountProfile, event } =
        await retrieveUserAccountProfileAndEventStored(command);

      assertThatPropertiesIn_userAccountProfile_match(
        userAccountProfile,
        command.getUserProfileId(),
        command.getUserAccountId(),
        command.getEmailAddress(),
        command.getPhoneNumber().number
      );

      assertThatEventIsPublishedWithCorrectProperties(
        event[0],
        userAccountProfile
      );
    });

    async function retrieveUserAccountProfileAndEventStored(
      command: NewUserAccountProfileCommand
    ) {
      const repositories = repositoryFactory.getRepositories(
        "UserAccountProfileRepository",
        "EventStore"
      );

      const userAccountProfile =
        await repositories.UserAccountProfileRepository.getProfileById(
          command.getUserProfileId()
        );
      const event = (await repositories.EventStore.getAllEventWithName(
        EventName.NewUserAccountProfileCreated
      )) as NewUserAccountProfileCreated[];

      return { userAccountProfile, event };
    }

    function assertThatPropertiesIn_userAccountProfile_match(
      aUserAccountProfile: UserAccountProfile,
      anId: string,
      aUserAccountId: string,
      anEmail: string,
      aPhoneNumber: string
    ) {
      expect(aUserAccountProfile).toBeInstanceOf(UserAccountProfile);
      expect(aUserAccountProfile.getId()).toBe(anId);
      expect(aUserAccountProfile["userAccountId"]["id"]).toBe(aUserAccountId);
      expect(aUserAccountProfile["emailAddress"].getValue()).toBe(anEmail);
      expect(aUserAccountProfile["phoneNumber"].getValue()).toBe(
        aPhoneNumber.slice(1) // phoneNumber is stored without the calling code or national prefix
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

    it("should throw error if userAccountProfile with userAccountId already exists", async () => {
      const command = createNewUserAccountProfileCommand(
        new UUIDGenerator().generate(),
        new UUIDGenerator().generate(),
        "test@tester.com",
        "08012345678",
        "NG"
      );

      await storeUserAccountProfileInDb(command); // store userAccountProfile in db to create conflict

      await expect(
        userAccountProfileApplicationService.createUserAccountProfile(command)
      ).rejects.toThrow(
        UserAccountProfileApplicationServiceError.userAccountAlreadyHasProfile
      );

      await removeUserAccountProfileFromDb(command);
    });

    async function storeUserAccountProfileInDb(
      command: NewUserAccountProfileCommand
    ) {
      const repositories = repositoryFactory.getRepositories(
        "UserAccountProfileRepository"
      );

      await repositories.UserAccountProfileRepository.save(
        new UserAccountProfile(
          new UserAccountProfileId(command.getUserProfileId()),
          new UserAccountId(command.getUserAccountId()),
          new EmailAddress(command.getEmailAddress(), false, null),
          new PhoneNumber(
            command.getPhoneNumber().number,
            new ITUAndISOSpecId(new UUIDGenerator().generate()),
            false,
            null
          )
        )
      );
    }

    async function removeUserAccountProfileFromDb(
      command: NewUserAccountProfileCommand
    ) {
      const repositories = repositoryFactory.getRepositories(
        "UserAccountProfileRepository"
      );

      await repositories.UserAccountProfileRepository.remove(
        command.getUserProfileId()
      );
    }

    /* This is a rare case; it occurs when the phoneNumberValidator data file includes 
    a country code that lacks a corresponding ITUAndISOSpec in the database */
    it("it should throw an error if the a valid country code does not have a ITUAndISOSpec in the DB", async () => {
      const command = createNewUserAccountProfileCommand(
        new UUIDGenerator().generate(),
        new UUIDGenerator().generate(),
        "test@tester.com",
        "2234567899",
        "US" // US is a valid country code but does not have a corresponding ITUAndISOSpec in the database
      );

      await expect(
        userAccountProfileApplicationService.createUserAccountProfile(command)
      ).rejects.toThrow(ITUAndISOSpecRepoErrorMsg.ITUAndISOSpecNotFound);
    });

    // phoneNumberValidator should always validate the phone number before the ITUAndISOSpec is retrieved
    it("should throw error if phoneNumber is invalid", async () => {
      const command = createNewUserAccountProfileCommand(
        new UUIDGenerator().generate(),
        new UUIDGenerator().generate(),
        "test@tester.com",
        "22345678", // invalid mobile number for usa
        "US"
      );

      await expect(
        userAccountProfileApplicationService.createUserAccountProfile(command)
      ).rejects.toThrow(phoneNumberError.invalidPhoneNumber);
    });

    it("should throw error if email is invalid", async () => {
      const command = createNewUserAccountProfileCommand(
        new UUIDGenerator().generate(),
        new UUIDGenerator().generate(),
        "testTester.com", // invalid email
        "08112345678",
        "NG"
      );

      await expect(
        userAccountProfileApplicationService.createUserAccountProfile(command)
      ).rejects.toThrow(emailAddressError.invalidEmail);
    });

    it("should throw error if userAccount id is wrong", async () => {
      const command = createNewUserAccountProfileCommand(
        "invalid Id",
        new UUIDGenerator().generate(),
        "test@tester.com", // invalid email
        "08112345678",
        "NG"
      );

      await expect(
        userAccountProfileApplicationService.createUserAccountProfile(command)
      ).rejects.toThrow(userAccountIdError.invalidUUID);
    });

    it("should throw error if userAccountProfile id is wrong", async () => {
      const command = createNewUserAccountProfileCommand(
        new UUIDGenerator().generate(),
        "invalid Id",
        "test@tester.com",
        "08112345678",
        "NG"
      );

      await expect(
        userAccountProfileApplicationService.createUserAccountProfile(command)
      ).rejects.toThrow(UserAccountProfileIdError.invalidUUID);
    });

    async function addDefaultITUAndISOSpecToDb() {
      const repositories = repositoryFactory.getRepositories(
        "ITUAndISOSpecRepository"
      );

      await repositories.ITUAndISOSpecRepository.save(
        new ITUAndISOSpec(
          new ITUAndISOSpecId(new UUIDGenerator().generate()),
          "countryId",
          "NG",
          "234"
        )
      );
    }

    function createNewUserAccountProfileCommand(
      aUserAccountId: string,
      aUserProfileId: string,
      anEmail: string,
      aPhoneNumber: string,
      aCountryCode: string
    ): NewUserAccountProfileCommand {
      return new NewUserAccountProfileCommand(
        aUserAccountId,
        aUserProfileId,
        anEmail,
        aPhoneNumber,
        aCountryCode
      );
    }
  });
});
