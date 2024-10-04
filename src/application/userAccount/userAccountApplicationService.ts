import RepositoryFactory from "../../domain/repositoryFactory/repositoryFactory";
import DomainEventPublisher from "../../domain/domainEventPublisher";
import DomainEventSubscriber from "../../domain/domainEventSubscriber";
import EventStoreDelegate from "../eventStoreDelegate";
import NewUserAccountCommand from "./newUserAccountCommand";
import UserAccount from "../../domain/model/userAccount/userAccount";
import UserName from "../../domain/model/userAccount/userName";
import Password from "../../domain/model/userAccount/password";
import UserAccountId from "../../domain/model/userAccount/userAccountId";
import AuthenticationMethod from "../../domain/model/accountAccessControl/authenticationMethod/authenticationMethod";
import Restriction from "../../domain/model/accountAccessControl/restriction/restriction";

class UserAccountApplicationService {
  private repositoryFactory: RepositoryFactory;

  constructor(aRepositoryFactory: RepositoryFactory) {
    this.repositoryFactory = aRepositoryFactory;
  }

  async createUserAccount(aCommand: NewUserAccountCommand) {
    const repositories = this.repositoryFactory.getRepositories(
      "UserAccountRepository",
      "AuthenticationMethodRepository",
      "RestrictionRepository",
      "EventStore"
    );

    await repositories.UserAccountRepository.throwErrorIfUserNameExistsInDB(
      aCommand.getUsername()
    );

    const authenticationMethod: AuthenticationMethod =
      await repositories.AuthenticationMethodRepository.getByType("password");
    const restriction: Restriction =
      await repositories.RestrictionRepository.getByReason(
        "awaiting profile creation"
      );

    const domainEventPublisher: DomainEventPublisher =
      this.initializeDomainEventPublisher(
        new EventStoreDelegate(repositories.EventStore)
      );

    const userAccount: UserAccount = new UserAccount(
      new UserAccountId(aCommand.getId()),
      [authenticationMethod.getId()],
      restriction.getId(),
      new UserName(aCommand.getUsername()),
      new Password(aCommand.getPassword())
    );

    await userAccount.publishNewUserAccountCreatedEvent(domainEventPublisher);

    await repositories.UserAccountRepository.save(userAccount);

    await repositories.UserAccountRepository.commit();
  }

  private initializeDomainEventPublisher(subscriber: DomainEventSubscriber) {
    const publisher: DomainEventPublisher = new DomainEventPublisher();

    publisher.subscribe(subscriber);

    return publisher;
  }
}

export default UserAccountApplicationService;
