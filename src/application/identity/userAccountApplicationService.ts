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

  createUserAccount(aCommand: NewUserAccountCommand) {
    const { userAccountRepository, eventStore } =
      this.getUserAccountRepositoryAndEventStore();

    const domainEventPublisher: DomainEventPublisher =
      this.initializeDomainEventPublisher(new EventStoreDelegate(eventStore));

    const userAccount: UserAccount = new UserAccount(
      new UserAccountId(aCommand.getId()),
      new UserName(aCommand.getUsername()),
      new Password(aCommand.getPassword())
    );

    this.throwErrorIfUserNameExistsInDB(
      aCommand.getUsername(),
      userAccountRepository
    );

    userAccount.publishNewUserAccountCreatedEvent(domainEventPublisher);

    userAccountRepository.save(userAccount);

    userAccountRepository.commit();
  }

  private getUserAccountRepositoryAndEventStore() {
    const repositories = this.repositoryFactory.getRepositoriesFor(
      "userAccount",
      "eventStore"
    );

    return {
      userAccountRepository: repositories.userAccount,
      eventStore: repositories.eventStore,
    };
  }

  private initializeDomainEventPublisher(subscriber: DomainEventSubscriber) {
    const domainEventPublisher: DomainEventPublisher =
      new DomainEventPublisher();

    domainEventPublisher.subscribe(subscriber);

    return domainEventPublisher;
  }

  private throwErrorIfUserNameExistsInDB(
    aUsername: string,
    aUserAccountRepository: UserAccountRepository
  ) {
    if (aUserAccountRepository.doesUserAccountExist(aUsername)) {
      throw new Error("User account already exists");
    }
  }
}

export default UserAccountApplicationService;
