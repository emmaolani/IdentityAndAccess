import RepositoryFactory from "../interface/repositoryFactory";
import NewUserAccountCommand from "./newUserAccountCommand";
import NewPersonalInfoCommand from "./newPersonalInfoCommand";

class UserAccountApplicationService {
  private repositoryFactory: RepositoryFactory;

  constructor(aRepositoryFactory: RepositoryFactory) {
    this.repositoryFactory = aRepositoryFactory;
  }

  createUserAccount(
    userAccountForm: NewUserAccountCommand,
    personalInfoForm: NewPersonalInfoCommand
  ) {
    const {
      userAccountRepository: UserAccountRepository,
      eventStore: EventStore,
    } = this.repositoryFactory.getUserAccountRepositoryAndEventStore();

    if (
      UserAccountRepository.doesUserAccountExist(userAccountForm.getUsername())
    ) {
      throw new Error("User account already exists");
    }
  }
}

export default UserAccountApplicationService;
