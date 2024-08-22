import DomainEventPublisher from "../../src/domain/domainEventPublisher";
import TestingEvent from "./mock/domainEventMock";
import AllEventSubscriber from "./mock/domainEventSubscriberMock/AllEventSubscriberMock";
import TestingEventSubscriber from "./mock/domainEventSubscriberMock/TestingEventSubscriberMock";

describe("Domain Event Publisher", () => {
  it("should publish event to all subscribers listening to 'All' EventType", () => {
    const domainEventPublisher = new DomainEventPublisher();
    const subscriber = new AllEventSubscriber();

    // register subscriber to publisher
    domainEventPublisher.subscribe(subscriber);

    const testingEvent = new TestingEvent();
    // publishing an event
    domainEventPublisher.publish(testingEvent);

    expect(subscriber.getEvent().getEventName).toBe(testingEvent.getEventName);
  });

  it("should publish event to all subscribers listening to specific EventType", () => {
    const domainEventPublisher = new DomainEventPublisher();
    const subscriber = new TestingEventSubscriber();

    // register subscriber to publisher
    domainEventPublisher.subscribe(subscriber);

    const testingEvent = new TestingEvent();
    // publishing an event
    domainEventPublisher.publish(testingEvent);

    expect(subscriber.getEvent().getEventName).toBe(testingEvent.getEventName);
  });
});
