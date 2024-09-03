import RepositoryFactory from "../../../domain/repositoryFactory/repositoryFactory";
import NewUserAccountProfileCommand from "./newUserAccountProfileCommand";

class UserAccountProfileApplicationService {
  private repositoryFactory: RepositoryFactory;

  constructor(aRepositoryFactory: RepositoryFactory) {
    this.repositoryFactory = aRepositoryFactory;
  }

  createUserAccountProfile(aCommand: NewUserAccountProfileCommand): void {
    const {
      userAccountProfileRepository,
      EventStore,
      userAccountRepository,
      ITUAndISOSpecRepository,
    } = this.getRepository();
  }

  private getRepository() {
    const repositories = this.repositoryFactory.getRepositoriesFor(
      "userAccountProfile",
      "eventStore",
      "userAccount",
      "ITUAndISOSpec"
    );

    return {
      userAccountProfileRepository: repositories.userAccount,
      EventStore: repositories.eventStore,
      userAccountRepository: repositories.userAccount,
      ITUAndISOSpecRepository: repositories.ITUAndISOSpec,
    };
  }
}

export default UserAccountProfileApplicationService;
