import DomainEventSubscriber from "../domain/domainEventSubscriber";
import DomainEvent from "../domain/domainEvent";
import EventStore from "../domain/eventStore";

class EventStoreDelegate implements DomainEventSubscriber {
  private eventStore: EventStore;
  private subscribedEventNames = ["ALL"];

  constructor(anEventStore: EventStore) {
    this.eventStore = anEventStore;
  }

  getSubscribedEventNames(): string[] {
    return this.subscribedEventNames;
  }

  handleEvent(anEvent: DomainEvent) {
    this.eventStore.append(anEvent);
  }
}

export default EventStoreDelegate;
