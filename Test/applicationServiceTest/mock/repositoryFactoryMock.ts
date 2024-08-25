import RepositoryFactory from "../../../src/domain/repositoryFactory";
import UserAccountRepository from "../../../src/domain/model/identity/userAccount/userAccountRepository";
import EventStore from "../../../src/domain/eventStore";

class RepositoryFactoryMock implements RepositoryFactory {
  private userAccountRepository: UserAccountRepository;
  private eventStore: EventStore;

  constructor(
    aUserAccountRepository: UserAccountRepository,
    anEventStore: EventStore
  ) {
    this.userAccountRepository = aUserAccountRepository;
    this.eventStore = anEventStore;
  }
  getUserAccountRepositoryAndEventStore() {
    return {
      userAccountRepository: this.userAccountRepository,
      eventStore: this.eventStore,
    };
  }
}

export default RepositoryFactoryMock;
