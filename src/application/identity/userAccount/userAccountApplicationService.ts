import RepositoryFactory from "../../../domain/repositoryFactory";
import DomainEventPublisher from "../../../domain/domainEventPublisher";
import DomainEventSubscriber from "../../../domain/domainEventSubscriber";
import EventStoreDelegate from "../../eventStoreDelegate";
import NewUserAccountCommand from "./newUserAccountCommand";
import UserAccount from "../../../domain/model/identity/userAccount/userAccount";
import UserName from "../../../domain/model/identity/userAccount/userName";
import Password from "../../../domain/model/identity/userAccount/password";

class UserAccountApplicationService {
  private repositoryFactory: RepositoryFactory;

  constructor(aRepositoryFactory: RepositoryFactory) {
    this.repositoryFactory = aRepositoryFactory;
  }

  createUserAccount(newUserAccountCommand: NewUserAccountCommand) {
    const { userAccountRepository, eventStore } =
      this.getUserAccountRepositoryAndEventStore();

    const doesUserAccountExist = userAccountRepository.doesUserAccountExist(
      newUserAccountCommand.getUsername()
    );

    if (!doesUserAccountExist) {
      const domainEventPublisher: DomainEventPublisher =
        this.initializeDomainEventPublisher(new EventStoreDelegate(eventStore));

      const userAccount: UserAccount = new UserAccount(
        newUserAccountCommand.getId(),
        new UserName(newUserAccountCommand.getUsername()),
        new Password(newUserAccountCommand.getPassword()),
        false
      );

      userAccount.publishNewUserAccountCreatedEvent(domainEventPublisher);

      userAccountRepository.save(userAccount);

      userAccountRepository.commit();
    } else {
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
