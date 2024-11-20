import UserAccountId from "./userAccountId";
import AuthenticationMethodId from "../accountAccessControl/authenticationMethod/authenticationMethodId";
import RestrictionId from "../accountAccessControl/restriction/restrictionId";
import UserName from "./userName";
import Password from "./password";
import NewUserAccountCreated from "./newUserAccountCreated";
import DomainEventPublisher from "../../domainEventPublisher";

class UserAccount {
  private id: UserAccountId;
  private authenticationMethodId: AuthenticationMethodId[];
  private restrictionId: RestrictionId | null;
  private username: UserName;
  private password: Password;

  constructor(
    anId: UserAccountId,
    aAuthenticationId: AuthenticationMethodId[],
    aRestrictionId: RestrictionId | null,
    aUsername: UserName,
    aPassword: Password
  ) {
    this.setId(anId);
    this.setAuthenticationMethodId(aAuthenticationId);
    this.setRestrictionId(aRestrictionId);
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

  private setAuthenticationMethodId(
    anAuthenticationMethodId: AuthenticationMethodId[]
  ) {
    this.authenticationMethodId = anAuthenticationMethodId;
  }

  private setRestrictionId(aRestrictionId: RestrictionId | null) {
    this.restrictionId = aRestrictionId;
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
