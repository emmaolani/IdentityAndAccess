import DomainEventSubscriber from "../domain/domainEventSubscriber";
import DomainEvent from "../domain/domainEvent";
import EventStore from "../domain/eventStore";

class EventStoreDelegate implements DomainEventSubscriber {
  private eventStore: EventStore;
  private subscribedEventNames = "ALL";

  constructor(anEventStore: EventStore) {
    this.eventStore = anEventStore;
  }

  getSubscribedEventNames(): string | string[] {
    return this.subscribedEventNames;
  }

  async handleEvent(anEvent: DomainEvent) {
    await this.eventStore.append(anEvent);
  }
}

export default EventStoreDelegate;
