import UserName from "./userName";
import Password from "./password";

class UserAccount {
  private id: string;
  private username: UserName;
  private password: Password;
  private isActive: boolean;

  constructor(
    anId: string,
    aUsername: UserName,
    aPassword: Password,
    aStatus: boolean
  ) {
    this.setId(anId);
    this.setUsername(aUsername);
    this.setPassword(aPassword);
    this.setActive(aStatus);
  }

  private setId(anId: string) {
    this.id = anId;
  }

  private setUsername(aUsername: UserName) {
    this.username = aUsername;
  }

  private setPassword(aPassword: Password) {
    this.password = aPassword;
  }

  private setActive(isActive: boolean) {
    this.isActive = isActive;
  }

  validate(username: string, password: string): boolean {
    if (!this.isActive) {
      return false;
    }

    return this.username.compare(username) && this.password.compare(password);
  }
}

export default UserAccount;
