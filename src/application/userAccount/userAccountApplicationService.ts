import RepositoryFactory from "../../domain/repositoryFactory";
import NewUserAccountCommand from "./newUserAccountCommand";
import NewPersonalInfoCommand from "./newPersonalInfoCommand";
import DomainEventPublisher from "../../domain/domainEventPublisher";
import DomainEventSubscriber from "../../domain/domainEventSubscriber";
import DomainEvent from "../../domain/domainEvent";

class UserAccountApplicationService {
  private repositoryFactory: RepositoryFactory;

  constructor(aRepositoryFactory: RepositoryFactory) {
    this.repositoryFactory = aRepositoryFactory;
  }

  createUserAccount(
    userAccountForm: NewUserAccountCommand,
    personalInfoForm: NewPersonalInfoCommand
  ) {
    const { userAccountRepository, eventStore } =
      this.repositoryFactory.getUserAccountRepositoryAndEventStore();

    const doesUserAccountExist = userAccountRepository.doesUserAccountExist(
      userAccountForm.getUsername()
    );

    if (!doesUserAccountExist) {
      const domainEventPublisher: DomainEventPublisher =
        new DomainEventPublisher();

      domainEventPublisher.subscribe(
        new (class subscriber implements DomainEventSubscriber {
          subscribeToEventType(): string {
            return "UserAccountCreated";
          }

          handleEvent(anEvent: DomainEvent) {
            eventStore.append(anEvent);
          }
        })()
      );
    } else {
      throw new Error("User account already exists");
    }
  }
}

export default UserAccountApplicationService;
