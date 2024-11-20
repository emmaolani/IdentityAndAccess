import UserAccountId from "../../../../src/domain/model/userAccount/userAccountId";
import AuthenticationMethodId from "../../../../src/domain/model/accountAccessControl/authenticationMethod/authenticationMethodId";
import RestrictionId from "../../../../src/domain/model/accountAccessControl/restriction/restrictionId";
import UserName from "../../../../src/domain/model/userAccount/userName";
import Password from "../../../../src/domain/model/userAccount/password";
import UserAccount from "../../../../src/domain/model/userAccount/userAccount";
import UUIDGenerator from "../../../../src/port/util/uUIDGenerator";
import DomainEventPublisher from "../../../../src/domain/domainEventPublisher";
import TestingEventSubscriber from "../../mock/domainEventSubscriberMock/TestingEventSubscriberMock";
import NewUserAccountCreated from "../../../../src/domain/model/userAccount/newUserAccountCreated";

describe("UserAccount", () => {
  let userAccount: UserAccount;

  it("should create a user account", () => {
    const userAccountId = new UUIDGenerator().generate();
    const authenticationMethodId = new UUIDGenerator().generate();
    const restrictionId = new UUIDGenerator().generate();
    const username = "username";
    const password = "SecureP@ss123";

    userAccount = new UserAccount(
      new UserAccountId(userAccountId),
      [new AuthenticationMethodId(authenticationMethodId)],
      new RestrictionId(restrictionId),
      new UserName(username),
      new Password(password)
    );

    assertThat_userAccount_propertiesMatches(
      userAccountId,
      username,
      password,
      authenticationMethodId,
      restrictionId
    );
  });

  function assertThat_userAccount_propertiesMatches(
    anId: string,
    aUsername: string,
    aPassword: string,
    anAuthenticationMethodId: string,
    aRestrictionId: string
  ) {
    expect(userAccount).toBeInstanceOf(UserAccount);
    expect(userAccount["id"]["id"]).toBe(anId);
    expect(userAccount["username"]["value"]).toBe(aUsername);
    expect(userAccount["password"]["value"]).toBe(aPassword);
    expect(userAccount["authenticationMethodId"][0]["id"]).toBe(
      anAuthenticationMethodId
    );
    expect(userAccount["restrictionId"]?.["id"]).toBe(aRestrictionId);
  }

  it("should publish new user account created event", async () => {
    userAccount = new UserAccount(
      new UserAccountId(new UUIDGenerator().generate()),
      [new AuthenticationMethodId(new UUIDGenerator().generate())],
      new RestrictionId(new UUIDGenerator().generate()),
      new UserName("username"),
      new Password("SecureP@ss123")
    );

    const domainEventPublisher: DomainEventPublisher =
      new DomainEventPublisher();

    const subscriber: TestingEventSubscriber = new TestingEventSubscriber(
      "NewUserAccountCreated"
    );

    domainEventPublisher.subscribe(subscriber);

    await userAccount.publishNewUserAccountCreatedEvent(domainEventPublisher);

    expect(subscriber.getEvent()).toBeInstanceOf(NewUserAccountCreated);
  });
});
