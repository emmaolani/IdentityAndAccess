import UserAccountRepository from "../../../src/domain/model/userAccount/userAccountRepository";
import UserAccount from "../../../src/domain/model/userAccount/userAccount";
import FakeDb from "./fakeDb/fakeDb";
import UserAccountRepoErrorMsg from "../../../src/port/_enums/errorMsg/repositoryErrorMsg/userAccountRepoErrorMsg";

class UserAccountRepositoryMock implements UserAccountRepository {
  private db: FakeDb;

  constructor(aDb: FakeDb) {
    this.db = aDb;
  }

  async throwErrorIfUserNameExistsInDB(aUsername: string): Promise<void> {
    const userAccount = this.db.find(UserAccount, aUsername);

    if (userAccount instanceof UserAccount) {
      throw Error(UserAccountRepoErrorMsg.UserAccountAlreadyExists);
    }

    return;
  }

  async lockUserAccount(UserAccountId: string): Promise<void> {
    return;
  }

  async save(userAccount: UserAccount): Promise<void> {
    this.db.save(userAccount);
    return;
  }

  async remove(anId: string): Promise<void> {
    this.db.remove(UserAccount, anId);
    return;
  }

  async getById(id: string): Promise<UserAccount> {
    const userAccount = this.db.find(UserAccount, id);

    if (userAccount instanceof UserAccount) {
      return userAccount;
    }

    throw new Error("UserAccount not found");
  }

  async commit(): Promise<void> {
    return;
  }
}

export default UserAccountRepositoryMock;
