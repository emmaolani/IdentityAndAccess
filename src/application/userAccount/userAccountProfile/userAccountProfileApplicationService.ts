import RepositoryFactory from "../../../domain/repositoryFactory/repositoryFactory";
import NewUserAccountProfileCommand from "./newUserAccountProfileCommand";
import PhoneNumberValidator from "../../phoneNumberValidator";
import UserAccountId from "../../../domain/model/userAccount/userAccountId";
import DomainEventPublisher from "../../../domain/domainEventPublisher";
import DomainEventSubscriber from "../../../domain/domainEventSubscriber";
import EventStoreDelegate from "../../eventStoreDelegate";
import UserAccountProfile from "../../../domain/model/userAccount/userAccountProfile/userAccountProfile";
import UserAccountProfileId from "../../../domain/model/userAccount/userAccountProfile/userAccountProfileId";
import EmailAddress from "../../../domain/model/contactDetails/emailAddress";
import PhoneNumber from "../../../domain/model/contactDetails/phoneNumber";
import ITUAndISOSpecId from "../../../domain/model/geographicEntities/ITUAndISOSpecId";

class UserAccountProfileApplicationService {
  private repositoryFactory: RepositoryFactory;

  constructor(aRepositoryFactory: RepositoryFactory) {
    this.repositoryFactory = aRepositoryFactory;
  }

  async createUserAccountProfile(
    aCommand: NewUserAccountProfileCommand
  ): Promise<void> {
    const repositories = this.repositoryFactory.getRepositories(
      "UserAccountProfileRepository",
      "EventStore",
      "UserAccountRepository",
      "ITUAndISOSpecRepository"
    );

    const mobileNumber = this.getNationalPhoneNumber(
      aCommand.getPhoneNumber().number,
      aCommand.getPhoneNumber().countryCode
    ); // This returns a valid ITU E.164 formatted phone number for a region

    await repositories.UserAccountRepository.lockUserAccount(
      aCommand.getUserAccountId()
    );

    await repositories.UserAccountProfileRepository.throwErrorIfUserAccountAlreadyHasProfile(
      aCommand.getUserAccountId()
    );

    const iTUAndISOSpec =
      await repositories.ITUAndISOSpecRepository.getSpecByCountryCode(
        aCommand.getPhoneNumber().countryCode
      );

    const domainEventPublisher: DomainEventPublisher =
      this.initializeDomainEventPublisher(
        new EventStoreDelegate(repositories.EventStore)
      );

    const userAccountProfile = new UserAccountProfile(
      new UserAccountProfileId(aCommand.getUserProfileId()),
      new UserAccountId(aCommand.getUserAccountId()),
      new EmailAddress(aCommand.getEmailAddress(), false, null),
      new PhoneNumber(
        mobileNumber,
        new ITUAndISOSpecId(iTUAndISOSpec.getId()),
        false,
        null
      )
    );

    await userAccountProfile.publishNewUserAccountProfileCreatedEvent(
      domainEventPublisher
    );

    repositories.UserAccountProfileRepository.save(userAccountProfile);

    repositories.UserAccountProfileRepository.commit();
  }

  private getNationalPhoneNumber(aNumber: string, aCountryCode: string) {
    return new PhoneNumberValidator().getValidNationalNumberForRegion(
      aNumber,
      aCountryCode
    );
  }

  private initializeDomainEventPublisher(subscriber: DomainEventSubscriber) {
    const publisher = new DomainEventPublisher();

    publisher.subscribe(subscriber);

    return publisher;
  }
}

export default UserAccountProfileApplicationService;
