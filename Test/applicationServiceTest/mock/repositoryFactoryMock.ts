import {
  RepositoryName,
  RepositoryCollection,
} from "../../../src/domain/repositoryFactory/repositoryFactory.type";
import RepositoryFactory from "../../../src/domain/repositoryFactory/repositoryFactory";
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

  getRepositories<T extends RepositoryName[]>(
    ...repos: T
  ): RepositoryCollection<T> {
    const repositories = {} as RepositoryCollection<RepositoryName[]>;

    repos.forEach((repo) => {
      switch (repo) {
        case "userAccount":
          repositories[repo] = this.userAccountRepository;
          break;
        case "eventStore":
          repositories[repo] = this.eventStore;
          break;
      }
    });

    return repositories;
  }
}

export default RepositoryFactoryMock;
