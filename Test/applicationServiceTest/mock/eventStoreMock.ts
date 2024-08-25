import EventStore from "../../../src/domain/eventStore";
import DomainEvent from "../../../src/domain/domainEvent";

class EventStoreMock implements EventStore {
  private domainEvents: DomainEvent | null = null;

  append(anEvent: DomainEvent) {
    this.domainEvents = anEvent;
  }
  getAllStoredEvents(): DomainEvent | null {
    return this.domainEvents;
  }
  clear() {
    this.domainEvents = null;
  }
}

export default EventStoreMock;
