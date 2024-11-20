import UserAccountRepository from "../../../src/domain/model/userAccount/userAccountRepository";
import UserAccount from "../../../src/domain/model/userAccount/userAccount";
import FakeDb from "./fakeDb/fakeDb";
import UserAccountRepoErrorMsg from "../../../src/port/adapters/persistance/repositoryErrorMsg/userAccountRepoErrorMsg";

class UserAccountRepositoryMock implements UserAccountRepository {
  private db: FakeDb;

  constructor(aDb: FakeDb) {
    this.db = aDb;
  }

  async throwErrorIfUserNameExistsInDB(aUsername: string): Promise<void> {
    const userAccount = this.db.find(UserAccount, aUsername);

    if (userAccount instanceof UserAccount) {
      throw Error(UserAccountRepoErrorMsg.conflict);
    }

    return;
  }

  async lockUserAccount(anId: string): Promise<void> {
    await this.getById(anId);
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

    throw new Error(UserAccountRepoErrorMsg.notFound);
  }

  async commit(): Promise<void> {
    return;
  }
}

export default UserAccountRepositoryMock;
