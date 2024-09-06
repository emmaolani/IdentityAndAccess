import {
  RepositoryName,
  RepositoryCollection,
} from "../../../src/domain/repositoryFactory/repositoryFactory.type";
import RepositoryFactory from "../../../src/domain/repositoryFactory/repositoryFactory";
import UserAccountRepositoryMock from "./userAccountRepositoryMock";
import EventStoreMock from "./eventStoreMock";
import UserAccountProfileRepositoryMock from "./userAccountProfileRepositoryMock";
import ITUAndISOSpecRepositoryMock from "./iTUAndISOSpecRepositoryMock";
import FakeDb from "./fakeDb";

class RepositoryFactoryMock implements RepositoryFactory {
  private DB = new FakeDb();

  getRepositories<T extends RepositoryName[]>(
    ...repos: T
  ): RepositoryCollection<T> {
    const repositories = {} as RepositoryCollection<RepositoryName[]>;

    repos.forEach((repo) => {
      switch (repo) {
        case "UserAccountRepository":
          const repository = new UserAccountRepositoryMock();
          repositories[repo] = repository;
          break;
        case "EventStore":
          repositories[repo] = new EventStoreMock(this.DB);
          break;
        case "UserAccountProfileRepository":
          repositories[repo] = new UserAccountProfileRepositoryMock(this.DB);
          break;
        case "ITUAndISOSpecRepository":
          repositories[repo] = new ITUAndISOSpecRepositoryMock(this.DB);
          break;
      }
    });
    return repositories;
  }

  reset(): void {
    this.DB = new FakeDb();
  }
}

export default RepositoryFactoryMock;
