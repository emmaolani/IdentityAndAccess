import {
  RepositoryName,
  RepositoryCollection,
} from "../../../src/domain/repositoryFactory/repositoryFactory.type";
import RepositoryFactory from "../../../src/domain/repositoryFactory/repositoryFactory";
import UserAccountRepositoryMock from "./userAccountRepositoryMock";
import EventStoreMock from "./eventStoreMock";

class RepositoryFactoryMock implements RepositoryFactory {
  private repositories: RepositoryCollection<RepositoryName[]> | null;
  private presetOptionForUserAccountRepo = {
    doesUserAccountExist: false,
  };

  getRepositories<T extends RepositoryName[]>(
    ...repos: T
  ): RepositoryCollection<T> {
    const repositories = {} as RepositoryCollection<RepositoryName[]>;

    repos.forEach((repo) => {
      switch (repo) {
        case "UserAccountRepository":
          const repository = new UserAccountRepositoryMock();
          repository.setDoesUserAccountExist(
            this.presetOptionForUserAccountRepo.doesUserAccountExist
          );
          repositories[repo] = repository;
          break;
        case "EventStore":
          repositories[repo] = new EventStoreMock();
          break;
      }
    });

    this.repositories = repositories;
    return repositories;
  }

  getRepositoriesUsed() {
    return this.repositories;
  }

  set_doesUserAccountExist_InUserAccountRepoTo(
    doesUserAccountExist: boolean
  ): void {
    this.presetOptionForUserAccountRepo.doesUserAccountExist =
      doesUserAccountExist;
  }

  reset(): void {
    this.repositories = null;
    this.presetOptionForUserAccountRepo.doesUserAccountExist = false;
  }
}

export default RepositoryFactoryMock;
