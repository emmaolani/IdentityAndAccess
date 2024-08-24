import EventStoreDelegate from "../../src/application/eventStoreDelegate";
import EventStoreMock from "./mock/eventStoreMock";
import TestingEvent from "../domainTest/mock/domainEventMock";

describe("EventStoreDelegate", () => {
  it("should be subscribed to All domain events", () => {
    const eventStoreSubscriber = new EventStoreDelegate(new EventStoreMock());

    expect(eventStoreSubscriber.getSubscribedEventNames()).toEqual(["ALL"]);
  });

  it("should delegate domain event to the event store", () => {
    const eventStore: EventStoreMock = new EventStoreMock();
    const eventStoreSubscriber = new EventStoreDelegate(eventStore);

    eventStoreSubscriber.handleEvent(new TestingEvent());

    expect(eventStore.domainEvents).toBeInstanceOf(TestingEvent);
  });
});
