import RepositoryFactory from "../../../src/domain/repositoryFactory/repositoryFactory";
import {
  RepositoryName,
  RepositoryCollection,
} from "../../../src/domain/repositoryFactory/repositoryFactory.type";
import UserAccountRepositoryMock from "./userAccountRepositoryMock";
import EventStoreMock from "./eventStoreMock";
import UserAccountProfileRepositoryMock from "./userAccountProfileRepositoryMock";
import ITUAndISOSpecRepositoryMock from "./iTUAndISOSpecRepositoryMock";
import FakeDb from "./fakeDb/fakeDb";

class RepositoryFactoryMock implements RepositoryFactory {
  private db = new FakeDb();

  getRepositories<T extends RepositoryName[]>(
    ...repos: T
  ): RepositoryCollection<T> {
    const repositories = {} as RepositoryCollection<RepositoryName[]>;

    repos.forEach((repo) => {
      switch (repo) {
        case "UserAccountRepository":
          const repository = new UserAccountRepositoryMock(this.db);
          repositories[repo] = repository;
          break;
        case "EventStore":
          repositories[repo] = new EventStoreMock(this.db);
          break;
        case "UserAccountProfileRepository":
          repositories[repo] = new UserAccountProfileRepositoryMock(this.db);
          break;
        case "ITUAndISOSpecRepository":
          repositories[repo] = new ITUAndISOSpecRepositoryMock(this.db);
          break;
      }
    });
    return repositories;
  }
}

export default RepositoryFactoryMock;
