import UserAccountProfileApplicationService from "../../../src/application/identity/userAccountProfile/userAccountProfileApplicationService";
import NewUserAccountProfileCommand from "../../../src/application/identity/userAccountProfile/newUserAccountProfileCommand";
import PhoneNumberValidatorImp from "../../../src/port/util/phoneNumberValidatorImp";
import RepositoryFactoryMock from "../mock/repositoryFactoryMock";
import UserAccountProfileRepositoryMock from "../mock/userAccountProfileRepositoryMock";
import EventStoreMock from "../mock/eventStoreMock";
import UserAccountProfile from "../../../src/domain/model/identity/userAccount/userAccountProfile/userAccountProfile";
import NewUserAccountProfileCreated from "../../../src/domain/model/identity/userAccount/userAccountProfile/newUserAccountProfileCreated";
import UUIDGenerator from "../../../src/port/adapters/controller/uUIDGenerator";
import UserAccountProfileApplicationServiceError from "../../../src/application/errorMsg/userAccountProfileApplicationServiceerrorMsg";

describe("UserAccountProfileApplicationService", () => {
  const repositoryFactory = new RepositoryFactoryMock();
  const phoneNumberValidator = new PhoneNumberValidatorImp();
  const userAccountProfileApplicationService =
    new UserAccountProfileApplicationService(
      repositoryFactory,
      phoneNumberValidator
    );

  beforeEach(() => {
    repositoryFactory.reset();
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

    const repositories = repositoryFactory.getRepositoriesUsed(); // get all repositories used in userAccountProfileApplicationService

    const userAccountProfileRepository =
      repositories?.UserAccountProfileRepository as UserAccountProfileRepositoryMock;
    const EventStore = repositories?.EventStore as EventStoreMock;

    const userAccountProfile = userAccountProfileRepository.getProfile(
      command.getUserProfileId()
    );
    const event =
      EventStore.getAllStoredEvents() as NewUserAccountProfileCreated;

    assertThatPropertiesIn_userAccountProfile_match(
      userAccountProfile,
      command.getUserProfileId(),
      command.getUserAccountId(),
      command.getEmailAddress(),
      command.getPhoneNumber().number
    );

    assertThatEventIsPublishedWithCorrectProperties(event, userAccountProfile);
  });

  it("should throw error if userAccountProfile with userAccountId already exists", async () => {
    repositoryFactory.setPresetOptionForUserAccountProfileRepo(true); // set preset option to true to simulate userAccountProfile with userAccountId Exists
    const command = createNewUserAccountProfileCommand(
      new UUIDGenerator().generate(),
      new UUIDGenerator().generate(),
      "test@tester.com",
      "08012345678",
      "NG"
    );

    await expect(
      userAccountProfileApplicationService.createUserAccountProfile(command)
    ).rejects.toThrow(
      UserAccountProfileApplicationServiceError.userAccountAlreadyHasProfile
    );
  });

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
});
