import UserAccountProfileApplicationService from "../../../src/application/identity/userAccountProfile/userAccountProfileApplicationService";
import NewUserAccountProfileCommand from "../../../src/application/identity/userAccountProfile/newUserAccountProfileCommand";
import PhoneNumberValidatorImp from "../../../src/port/util/phoneNumberValidatorImp";
import RepositoryFactoryMock from "../mock/repositoryFactoryMock";
import UserAccountProfileRepositoryMock from "../mock/userAccountProfileRepositoryMock";
import UserAccountRepositoryMock from "../mock/userAccountRepositoryMock";
import ITUAndISOSpecRepositoryMock from "../mock/iTUAndISOSpecRepositoryMock";
import UUIDGenerator from "../../../src/port/adapters/controller/uUIDGenerator";
import EventStoreMock from "../mock/eventStoreMock";

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
    const id = new UUIDGenerator().generate();
    const userAccountId = new UUIDGenerator().generate();
    const email = "test@tester.com";
    const phoneNumber = "08012345678";

    const countryCode = "NG";
    const command = new NewUserAccountProfileCommand(
      userAccountId,
      id,
      email,
      phoneNumber,
      countryCode
    );

    await userAccountProfileApplicationService.createUserAccountProfile(
      command
    );

    const repositories = repositoryFactory.getRepositoriesUsed();

    const userAccountProfileRepository =
      repositories?.UserAccountProfileRepository as UserAccountProfileRepositoryMock;
    const EventStore = repositories?.EventStore as EventStoreMock;

    const userAccountProfile = userAccountProfileRepository.getProfile(id);
    const events = EventStore.getAllStoredEvents();

    expect(userAccountProfile.getId()).toBe(id);
  });
});
