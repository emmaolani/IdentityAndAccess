import UserAccount from "../../../../../src/domain/model/identity/userAccount/userAccount";
import UserName from "../../../../../src/domain/model/identity/userAccount/userName";
import Password from "../../../../../src/domain/model/identity/userAccount/password";
import UserAccountId from "../../../../../src/domain/model/identity/userAccount/userAccountId";
import UUIDGenerator from "../../../../../src/port/adapters/controller/uUIDGenerator";
import DomainEventPublisher from "../../../../../src/domain/domainEventPublisher";
import TestingEventSubscriber from "../../../mock/domainEventSubscriberMock/TestingEventSubscriberMock";
import NewUserAccountCreated from "../../../../../src/domain/model/identity/userAccount/newUserAccountCreated";

describe("UserAccount", () => {
  it("should create a user account", () => {
    const userAccount = new UserAccount(
      new UserAccountId(new UUIDGenerator().generate()),
      new UserName("username"),
      new Password("SecureP@ss123"),
      true
    );

    expect(userAccount).toBeInstanceOf(UserAccount);
  });

  it("should return true if a user's username and password is valid", () => {
    const userAccount = new UserAccount(
      new UserAccountId(new UUIDGenerator().generate()),
      new UserName("username"),
      new Password("SecureP@ss123"),
      true
    );

    expect(userAccount.validate("username", "SecureP@ss123")).toBe(true);
    expect(userAccount.validate("username", "password1")).toBe(false);
  });

  it("should throw error if active status is false", () => {
    const userAccount = new UserAccount(
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
    const userAccount = new UserAccount(
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
