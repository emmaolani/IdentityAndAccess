import RepositoryFactory from "../../domain/repositoryFactory/repositoryFactory";
import DomainEventPublisher from "../../domain/domainEventPublisher";
import DomainEventSubscriber from "../../domain/domainEventSubscriber";
import EventStoreDelegate from "../eventStoreDelegate";
import NewUserAccountCommand from "./newUserAccountCommand";
import UserAccount from "../../domain/model/identity/userAccount/userAccount";
import UserName from "../../domain/model/identity/userAccount/userName";
import Password from "../../domain/model/identity/userAccount/password";
import UserAccountId from "../../domain/model/identity/userAccount/userAccountId";
import UserAccountRepository from "../../domain/model/identity/userAccount/userAccountRepository";

class UserAccountApplicationService {
  private repositoryFactory: RepositoryFactory;

  constructor(aRepositoryFactory: RepositoryFactory) {
    this.repositoryFactory = aRepositoryFactory;
  }

  async createUserAccount(aCommand: NewUserAccountCommand) {
    const repositories = this.repositoryFactory.getRepositories(
      "UserAccountRepository",
      "EventStore"
    );

    const domainEventPublisher: DomainEventPublisher =
      this.initializeDomainEventPublisher(
        new EventStoreDelegate(repositories.EventStore)
      );

    const userAccount: UserAccount = new UserAccount(
      new UserAccountId(aCommand.getId()),
      new UserName(aCommand.getUsername()),
      new Password(aCommand.getPassword())
    );

    await this.throwErrorIfUserNameExistsInDB(
      aCommand.getUsername(),
      repositories.UserAccountRepository
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

  private async throwErrorIfUserNameExistsInDB(
    aUsername: string,
    aUserAccountRepository: UserAccountRepository
  ) {
    const result = await aUserAccountRepository.doesUserAccountExist(aUsername);
    if (result) {
      throw new Error("User account already exists");
    }
  }
}

export default UserAccountApplicationService;
