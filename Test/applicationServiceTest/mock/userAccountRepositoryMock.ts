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

  async doesUserAccountExist(username: string): Promise<boolean> {
    return this.userAccountExists;
  }

  setDoesUserAccountExist(userAccountExists: boolean): void {
    this.userAccountExists = userAccountExists;
  }

  async lockUserAccount(UserAccountId: string): Promise<void> {
    return;
  }

  async save(userAccount: UserAccount): Promise<void> {
    this.userAccount = userAccount;
    return;
  }

  async commit(): Promise<void> {
    return;
  }

  getNewlyCreatedUserAccount(): UserAccount {
    return this.userAccount;
  }
}

export default UserAccountRepositoryMock;
