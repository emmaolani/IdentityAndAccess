import { RepositoryName, RepositoryCollection } from "./repositoryFactory.type";
import UserAccountRepository from "../model/identity/userAccount/userAccountRepository";
import EventStore from "../eventStore";

interface RepositoryFactory {
  getRepositoriesFor<T extends RepositoryName[]>(
    ...repos: T
  ): RepositoryCollection<T>;
}

export default RepositoryFactory;
