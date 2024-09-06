import UserAccountId from "./userAccountId";
import UserName from "./userName";
import Password from "./password";
import NewUserAccountCreated from "./newUserAccountCreated";
import DomainEventPublisher from "../../../domainEventPublisher";

class UserAccount {
  private id: UserAccountId;
  private username: UserName;
  private password: Password;
  private isActive: boolean;

  constructor(anId: UserAccountId, aUsername: UserName, aPassword: Password) {
    this.setId(anId);
    this.setUsername(aUsername);
    this.setPassword(aPassword);
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

  async publishNewUserAccountCreatedEvent(
    aDomainEventPublisher: DomainEventPublisher
  ) {
    await aDomainEventPublisher.publish(
      new NewUserAccountCreated(this.id.getId(), this.username.getValue())
    );
  }
}

export default UserAccount;
