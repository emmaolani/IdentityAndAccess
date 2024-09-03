import UserAccountRepository from "../../../src/domain/model/identity/userAccount/userAccountRepository";
import UserAccount from "../../../src/domain/model/identity/userAccount/userAccount";
import UserAccountId from "../../../src/domain/model/identity/userAccount/userAccountId";
import UserName from "../../../src/domain/model/identity/userAccount/userName";
import Password from "../../../src/domain/model/identity/userAccount/password";

class UserAccountRepositoryMock implements UserAccountRepository {
  private defaultUserAccount = new UserAccount(
    new UserAccountId("0f8fa965-5079-48e1-8743-a82e75829560"),
    new UserName("username"),
    new Password("secureD@123")
  );
  private userAccount: UserAccount;
  private userAccountExists: boolean;

  doesUserAccountExist(username: string): boolean {
    return this.userAccountExists;
  }

  setDoesUserAccountExist(userAccountExists: boolean): void {
    this.userAccountExists = userAccountExists;
  }

  save(userAccount: UserAccount): void {
    this.userAccount = userAccount;
  }

  getUserAccount(username: string): UserAccount {
    return this.userAccount;
  }

  reset(): void {
    this.userAccount = this.defaultUserAccount;
  }

  commit(): void {
    return;
  }
}

export default UserAccountRepositoryMock;
