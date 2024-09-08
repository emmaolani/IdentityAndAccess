import UserAccountRepository from "../../../src/domain/model/identity/userAccount/userAccountRepository";
import UserAccount from "../../../src/domain/model/identity/userAccount/userAccount";
import FakeDb from "./fakeDb/fakeDb";

class UserAccountRepositoryMock implements UserAccountRepository {
  private db: FakeDb;

  constructor(aDb: FakeDb) {
    this.db = aDb;
  }

  async doesUserAccountExist(anId: string): Promise<boolean> {
    if (this.db.find(UserAccount, anId) !== undefined) {
      return true;
    }
    return false;
  }

  async lockUserAccount(UserAccountId: string): Promise<void> {
    return;
  }

  async save(userAccount: UserAccount): Promise<void> {
    this.db.save(userAccount);
    return;
  }

  async remove(id: string): Promise<void> {
    this.db.remove(UserAccount, id);
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
