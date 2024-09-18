import RepositoryFactory from "../../../src/domain/repositoryFactory/repositoryFactory";
import {
  RepositoryName,
  RepositoryCollection,
} from "../../../src/domain/repositoryFactory/repositoryFactory.type";
import FakeDb from "./fakeDb/fakeDb";
import UserAccountRepositoryMock from "./userAccountRepositoryMock";
import EventStoreMock from "./eventStoreMock";
import UserAccountProfileRepositoryMock from "./userAccountProfileRepositoryMock";
import ITUAndISOSpecRepositoryMock from "./iTUAndISOSpecRepositoryMock";
import AuthenticationMethodRepositoryMock from "./authenticationMethodRepositoryMock";
import RestrictionRepositoryMock from "./restrictionRepositoryMock";
import TestPrerequisiteRepository from "./testPrerequisiteRepository";

class RepositoryFactoryMock implements RepositoryFactory {
  private db: FakeDb;

  constructor() {
    this.setFakeDb();
  }

  getRepositories<T extends RepositoryName[]>(
    ...repos: T
  ): RepositoryCollection<T> {
    const repositories = {} as RepositoryCollection<RepositoryName[]>;

    repos.forEach((repo) => {
      switch (repo) {
        case "UserAccountRepository":
          repositories[repo] = new UserAccountRepositoryMock(this.db);
          break;
        case "UserAccountProfileRepository":
          repositories[repo] = new UserAccountProfileRepositoryMock(this.db);
          break;
        case "ITUAndISOSpecRepository":
          repositories[repo] = new ITUAndISOSpecRepositoryMock(this.db);
          break;
        case "AuthenticationMethodRepository":
          repositories[repo] = new AuthenticationMethodRepositoryMock(this.db);
          break;
        case "RestrictionRepository":
          repositories[repo] = new RestrictionRepositoryMock(this.db);
          break;
        case "EventStore":
          repositories[repo] = new EventStoreMock(this.db);
          break;
      }
    });

    return repositories;
  }

  getTestPrerequisiteRepository() {
    return new TestPrerequisiteRepository(this.db);
  }

  private setFakeDb() {
    this.db = new FakeDb();
  }
}

export default RepositoryFactoryMock;
