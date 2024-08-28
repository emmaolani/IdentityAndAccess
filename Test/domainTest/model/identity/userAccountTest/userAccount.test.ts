import UserAccount from "../../../../../src/domain/model/identity/userAccount/userAccount";
import UserName from "../../../../../src/domain/model/identity/userAccount/userName";
import Password from "../../../../../src/domain/model/identity/userAccount/password";
import UserAccountId from "../../../../../src/domain/model/identity/userAccount/userAccountId";
import UUIDGenerator from "../../../../../src/port/adapters/controller/uUIDGenerator";
import DomainEventPublisher from "../../../../../src/domain/domainEventPublisher";
import TestingEventSubscriber from "../../../mock/domainEventSubscriberMock/TestingEventSubscriberMock";
import NewUserAccountCreated from "../../../../../src/domain/model/identity/userAccount/newUserAccountCreated";

describe("UserAccount", () => {
  let userAccount: UserAccount;

  it("should create a user account", () => {
    const id = new UUIDGenerator().generate();
    const username = "username";
    const password = "SecureP@ss123";
    userAccount = new UserAccount(
      new UserAccountId(id),
      new UserName(username),
      new Password(password),
      true
    );

    assertThatPropertiesIn_userAccount_match(id, username, password);
  });

  function assertThatPropertiesIn_userAccount_match(
    anId: string,
    aUsername: string,
    aPassword: string
  ) {
    expect(userAccount).toBeInstanceOf(UserAccount);
    expect(userAccount["id"]["value"]).toBe(anId);
    expect(userAccount["username"]["value"]).toBe(aUsername);
    expect(userAccount["password"]["value"]).toBe(aPassword);
  }

  it("should return true if a user's username and password is valid", () => {
    userAccount = new UserAccount(
      new UserAccountId(new UUIDGenerator().generate()),
      new UserName("username"),
      new Password("SecureP@ss123"),
      true
    );

    expect(userAccount.validate("username", "SecureP@ss123")).toBe(true);
    expect(userAccount.validate("username", "password1.0")).toBe(false);
    expect(userAccount.validate("username1.0", "SecureP@ss123")).toBe(false);
  });

  it("should not validate user and throw an error if active status is false", () => {
    userAccount = new UserAccount(
      new UserAccountId(new UUIDGenerator().generate()),
      new UserName("username"),
      new Password("SecureP@ss123"),
      false
    );

    expect(() => userAccount.validate("username", "SecureP@ss123")).toThrow(
      "User account is not active"
    );
  });

  it("should publish new user account created event", () => {
    userAccount = new UserAccount(
      new UserAccountId(new UUIDGenerator().generate()),
      new UserName("username"),
      new Password("SecureP@ss123"),
      true
    );

    const domainEventPublisher: DomainEventPublisher =
      new DomainEventPublisher();

    const subscriber: TestingEventSubscriber = new TestingEventSubscriber(
      "NewUserAccountCreated"
    );

    domainEventPublisher.subscribe(subscriber);

    userAccount.publishNewUserAccountCreatedEvent(domainEventPublisher);

    expect(subscriber.getEvent()).toBeInstanceOf(NewUserAccountCreated);
  });
});
