import EventStoreDelegate from "../../src/application/eventStoreDelegate";
import EventStoreMock from "./mock/eventStoreMock";
import TestingEvent from "../domainTest/mock/domainEventMock";

describe("EventStoreDelegate", () => {
  it("should delegate domain event to the event store", () => {
    const eventStore: EventStoreMock = new EventStoreMock();
    const eventStoreSubscriber = new EventStoreDelegate(eventStore);

    eventStoreSubscriber.handleEvent(new TestingEvent());

    expect(eventStore.domainEvents).toBeInstanceOf(TestingEvent);
  });
});
