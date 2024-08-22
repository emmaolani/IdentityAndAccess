import EventStore from "../../../src/domain/eventStore";
import DomainEvent from "../../../src/domain/domainEvent";

class EventStoreMock implements EventStore {
  domainEvents: DomainEvent;

  append(anEvent: DomainEvent) {
    this.domainEvents = anEvent;
  }
}

export default EventStoreMock;
