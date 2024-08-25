import UserAccountRepository from "./model/identity/userAccount/userAccountRepository";
import EventStore from "./eventStore";

interface RepositoryFactory {
  getUserAccountRepositoryAndEventStore<T>(): {
    userAccountRepository: UserAccountRepository;
    eventStore: EventStore;
  };
}

export default RepositoryFactory;
