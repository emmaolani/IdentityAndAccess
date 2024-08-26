import UserName from "./userName";
import Password from "./password";
import DomainEventPublisher from "../../../domainEventPublisher";
import NewUserAccountCreated from "./newUserAccountCreated";

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
      throw new Error("User account is not active");
    }

    return (
      this.username.compareTo(username) && this.password.compareTo(password)
    );
  }

  publishNewUserAccountCreatedEvent(
    aDomainEventPublisher: DomainEventPublisher
  ) {
    if (aDomainEventPublisher) {
      aDomainEventPublisher.publish(
        new NewUserAccountCreated(this.id, this.username.getValue())
      );
    } else {
      throw new Error("DomainEventPublisher is not given");
    }
  }
}

export default UserAccount;