import UserAccountRepository from "../../../src/domain/model/identity/userAccount/userAccountRepository";
import UserAccount from "../../../src/domain/model/identity/userAccount/userAccount";

class UserAccountRepositoryMock implements UserAccountRepository {
  private userAccounts: UserAccount | null;
  private userAccountExists: boolean;

  doesUserAccountExist(username: string): boolean {
    return this.userAccountExists;
  }

  setDoesUserAccountExist(userAccountExists: boolean): void {
    this.userAccountExists = userAccountExists;
  }

  save(userAccount: UserAccount): void {
    this.userAccounts = userAccount;
  }

  getUserAccount(username: string): UserAccount | null {
    return this.userAccounts;
  }

  clear(): void {
    this.userAccounts = null;
  }

  commit(): void {
    return;
  }
}

export default UserAccountRepositoryMock;
