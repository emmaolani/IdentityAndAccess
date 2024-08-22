import DomainEventSubscriber from "../domain/domainEventSubscriber";
import DomainEvent from "../domain/domainEvent";
import EventStore from "../domain/eventStore";

class EventStoreDelegate implements DomainEventSubscriber {
  private eventStore: EventStore;
  private eventType = ["ALL"];

  constructor(anEventStore: EventStore) {
    this.eventStore = anEventStore;
  }

  subscribeToEventType(): string[] {
    return this.eventType;
  }

  handleEvent(anEvent: DomainEvent) {
    this.eventStore.append(anEvent);
  }
}

export default EventStoreDelegate;
