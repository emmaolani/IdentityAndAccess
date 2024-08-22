import RepositoryFactory from "../../domain/repositoryFactory";
import DomainEventPublisher from "../../domain/domainEventPublisher";
import DomainEventSubscriber from "../../domain/domainEventSubscriber";
import NewUserAccountCommand from "./newUserAccountCommand";
import EventStoreDelegate from "../eventStoreDelegate";

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
