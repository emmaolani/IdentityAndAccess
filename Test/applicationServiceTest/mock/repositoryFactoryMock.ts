import {
  RepositoryName,
  RepositoryCollection,
} from "../../../src/domain/repositoryFactory/repositoryFactory.type";
import RepositoryFactory from "../../../src/domain/repositoryFactory/repositoryFactory";
import UserAccountRepositoryMock from "./userAccountRepositoryMock";
import EventStoreMock from "./eventStoreMock";
import UserAccountProfileRepositoryMock from "./userAccountProfileRepositoryMock";
import ITUAndISOSpecRepositoryMock from "./iTUAndISOSpecRepositoryMock";

class RepositoryFactoryMock implements RepositoryFactory {
  private repositories: RepositoryCollection<RepositoryName[]> | null;
  private presetOptionForUserAccountRepo = {
    doesUserAccountExist: false,
  };
  private presetOptionForUserAccountProfileRepo = {
    doesUserAccountHaveProfile: false, // simulate userAccount already having a userAccountProfile
  };
  private presetOptionForITUAndISOSpecRepo = {
    initializeWithITUAndISOSpec: true,
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
        case "UserAccountProfileRepository":
          repositories[repo] = new UserAccountProfileRepositoryMock(
            this.presetOptionForUserAccountProfileRepo.doesUserAccountHaveProfile
          );
          break;
        case "ITUAndISOSpecRepository":
          repositories[repo] = new ITUAndISOSpecRepositoryMock(
            this.presetOptionForITUAndISOSpecRepo.initializeWithITUAndISOSpec
          );
          break;
      }
    });

    this.repositories = repositories;
    return repositories;
  }

  getRepositoriesUsed() {
    return this.repositories;
  }

  setPresetOptionForUserAccountRepo(doesUserAccountExist: boolean): void {
    this.presetOptionForUserAccountRepo.doesUserAccountExist =
      doesUserAccountExist;
  }

  setPresetOptionForUserAccountProfileRepo(
    shouldUserAccountProfileWithUserAccountIdExist: boolean
  ): void {
    this.presetOptionForUserAccountProfileRepo.doesUserAccountHaveProfile =
      shouldUserAccountProfileWithUserAccountIdExist;
  }

  setPresetOptionForITUAndISOSpecRepo(
    initializeWithITUAndISOSpec: boolean
  ): void {
    this.presetOptionForITUAndISOSpecRepo.initializeWithITUAndISOSpec =
      initializeWithITUAndISOSpec;
  }

  reset(): void {
    this.repositories = null;
    this.presetOptionForUserAccountRepo = {
      doesUserAccountExist: false,
    };
    this.presetOptionForUserAccountProfileRepo = {
      doesUserAccountHaveProfile: false,
    };
    this.presetOptionForITUAndISOSpecRepo = {
      initializeWithITUAndISOSpec: true,
    };
  }
}

export default RepositoryFactoryMock;
