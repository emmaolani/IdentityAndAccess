import RepositoryFactory from "../../../domain/repositoryFactory";
import DomainEventPublisher from "../../../domain/domainEventPublisher";
import DomainEventSubscriber from "../../../domain/domainEventSubscriber";
import EventStoreDelegate from "../../eventStoreDelegate";
import NewUserAccountCommand from "./newUserAccountCommand";
import UserAccount from "../../../domain/model/identity/userAccount/userAccount";
import UserName from "../../../domain/model/identity/userAccount/userName";
import Password from "../../../domain/model/identity/userAccount/password";
import UserAccountId from "../../../domain/model/identity/userAccount/userAccountId";
import UserAccountRepository from "../../../domain/model/identity/userAccount/userAccountRepository";

class UserAccountApplicationService {
  private repositoryFactory: RepositoryFactory;

  constructor(aRepositoryFactory: RepositoryFactory) {
    this.repositoryFactory = aRepositoryFactory;
  }

  createUserAccount(aNewUserAccountCommand: NewUserAccountCommand) {
    const { userAccountRepository, eventStore } =
      this.getUserAccountRepositoryAndEventStore();

    const domainEventPublisher: DomainEventPublisher =
      this.initializeDomainEventPublisher(new EventStoreDelegate(eventStore));

    const userAccount: UserAccount = new UserAccount(
      new UserAccountId(aNewUserAccountCommand.getId()),
      new UserName(aNewUserAccountCommand.getUsername()),
      new Password(aNewUserAccountCommand.getPassword()),
      false
    );

    this.throwErrorIfUserNameExistsInDB(
      aNewUserAccountCommand.getUsername(),
      userAccountRepository
    );

    userAccount.publishNewUserAccountCreatedEvent(domainEventPublisher);

    userAccountRepository.save(userAccount);

    userAccountRepository.commit();
  }

  private throwErrorIfUserNameExistsInDB(
    aUsername: string,
    aUserAccountRepository: UserAccountRepository
  ) {
    if (aUserAccountRepository.doesUserAccountExist(aUsername)) {
      throw new Error("User account already exists");
    }
  }

  private getUserAccountRepositoryAndEventStore() {
    return this.repositoryFactory.getUserAccountRepositoryAndEventStore();
  }

  private initializeDomainEventPublisher(subscriber: DomainEventSubscriber) {
    const domainEventPublisher: DomainEventPublisher =
      new DomainEventPublisher();

    domainEventPublisher.subscribe(subscriber);

    return domainEventPublisher;
  }
}

export default UserAccountApplicationService;
