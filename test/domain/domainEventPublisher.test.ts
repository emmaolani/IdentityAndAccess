import DomainEventPublisher from "../../src/domain/domainEventPublisher";
import NewUserAccountCreated from "../../src/domain/model/userAccount/newUserAccountCreated";
import TestingEventSubscriber from "./mock/domainEventSubscriberMock/TestingEventSubscriberMock";

describe("Domain Event Publisher", () => {
  it("should publish event to all subscribers listening to 'All' EventType", () => {
    const domainEventPublisher = new DomainEventPublisher();
    const event = new NewUserAccountCreated("userId", "username");
    const subscriberOne = new TestingEventSubscriber("ALL");
    const subscriberTwo = new TestingEventSubscriber(["ALL"]); // same as subscriberOne

    // register subscriber to publisher
    domainEventPublisher.subscribe(subscriberOne);
    domainEventPublisher.subscribe(subscriberTwo);

    // publishing an event
    domainEventPublisher.publish(event);

    expect(subscriberOne.getEvent().getEventName()).toBe(event.getEventName());
    expect(subscriberTwo.getEvent().getEventName()).toBe(event.getEventName());
  });

  it("should publish event to all subscribers listening to specific EventType", () => {
    const domainEventPublisher = new DomainEventPublisher();
    const event = new NewUserAccountCreated("userId", "username");
    const subscriberOne = new TestingEventSubscriber("NewUserAccountCreated");
    const subscriberTwo = new TestingEventSubscriber(["NewUserAccountCreated"]); // same as subscriberOne

    // register subscriber to publisher
    domainEventPublisher.subscribe(subscriberOne);
    domainEventPublisher.subscribe(subscriberTwo);

    // publishing an event
    domainEventPublisher.publish(event);

    expect(subscriberOne.getEvent().getEventName()).toBe(event.getEventName());
    expect(subscriberTwo.getEvent().getEventName()).toBe(event.getEventName());
  });
});
