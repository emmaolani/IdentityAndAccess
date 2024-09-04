import RepositoryFactory from "../../../domain/repositoryFactory/repositoryFactory";
import NewUserAccountProfileCommand from "./newUserAccountProfileCommand";
import PhoneNumberValidator from "../../phoneNumberValidator";
import UserAccountId from "../../../domain/model/identity/userAccount/userAccountId";
import UserAccountProfileRepository from "../../../domain/model/identity/userAccount/userAccountProfile/userAccountProfileRepository";
import DomainEventPublisher from "../../../domain/domainEventPublisher";
import DomainEventSubscriber from "../../../domain/domainEventSubscriber";
import EventStoreDelegate from "../../eventStoreDelegate";
import UserAccountProfile from "../../../domain/model/identity/userAccount/userAccountProfile/userAccountProfile";
import UserAccountProfileId from "../../../domain/model/identity/userAccount/userAccountProfile/userAccountProfileId";
import EmailAddress from "../../../domain/model/contactDetails/emailAddress";
import PhoneNumber from "../../../domain/model/contactDetails/phoneNumber";
import ITUAndISOSpecId from "../../../domain/model/geographicEntities/ITUAndISOSpecId";

class UserAccountProfileApplicationService {
  private repositoryFactory: RepositoryFactory;
  private phoneNumberValidator: PhoneNumberValidator;

  constructor(
    aRepositoryFactory: RepositoryFactory,
    aPhoneNumberValidator: PhoneNumberValidator
  ) {
    this.repositoryFactory = aRepositoryFactory;
    this.phoneNumberValidator = aPhoneNumberValidator;
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

    this.phoneNumberValidator.getValidNationalNumberForRegion(
      aCommand.getPhoneNumber().countryCode,
      aCommand.getPhoneNumber().countryCode
    );

    await repositories.UserAccountRepository.lockUserAccount(
      aCommand.getUserAccountId()
    );

    await this.throwErrorIfUserAccountProfileWithUserAccountIdAlreadyExists(
      aCommand.getUserAccountId(),
      repositories.UserAccountProfileRepository
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
        aCommand.getPhoneNumber().number,
        iTUAndISOSpec.getId(),
        false,
        null
      )
    );
  }

  private async throwErrorIfUserAccountProfileWithUserAccountIdAlreadyExists(
    aUserAccountId: string,
    aRepository: UserAccountProfileRepository
  ): Promise<void> {
    if (
      await aRepository.doesUserAccountProfileWithUserAccountIdExist(
        aUserAccountId
      )
    ) {
      throw new Error(
        "User account profile with user account id already exists."
      );
    }
    return;
  }

  private initializeDomainEventPublisher(subscriber: DomainEventSubscriber) {
    const publisher = new DomainEventPublisher();

    publisher.subscribe(subscriber);

    return publisher;
  }
}

export default UserAccountProfileApplicationService;
