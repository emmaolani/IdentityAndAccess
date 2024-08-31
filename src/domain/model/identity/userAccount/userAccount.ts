import UserAccountId from "./userAccountId";
import UserName from "./userName";
import Password from "./password";
import NewUserAccountCreated from "./newUserAccountCreated";
import DomainEventPublisher from "../../../domainEventPublisher";
import { userAccountError } from "../../../enum/errors/errorMsg";

// TODO: implement status
class UserAccount {
  private id: UserAccountId;
  private username: UserName;
  private password: Password;
  private isActive: boolean;

  constructor(
    anId: UserAccountId,
    aUsername: UserName,
    aPassword: Password,
    aStatus: boolean
  ) {
    this.setId(anId);
    this.setUsername(aUsername);
    this.setPassword(aPassword);
    this.setActive(aStatus);
  }

  private setId(anId: UserAccountId) {
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

  getActiveStatus(): boolean {
    return this.isActive;
  }

  throwErrorIfUserNameAndPasswordIsNotValid(
    username: string,
    password: string
  ): void {
    if (!this.isActive) {
      throw new Error(userAccountError.userAccountNotActive);
    }
    if (!this.isUsernameAndPasswordValid(username, password)) {
      throw new Error(userAccountError.InvalidUsernameOrPassword);
    }
  }

  private isUsernameAndPasswordValid(username: string, password: string) {
    return (
      this.username.isEqualTo(username) && this.password.isEqualTo(password)
    );
  }

  publishNewUserAccountCreatedEvent(
    aDomainEventPublisher: DomainEventPublisher
  ) {
    aDomainEventPublisher.publish(
      new NewUserAccountCreated(this.id.getValue(), this.username.getValue())
    );
  }
}

export default UserAccount;
