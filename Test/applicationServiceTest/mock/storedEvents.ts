import DomainEvent from "../../../src/domain/domainEvent";

class StoredEvent {
  private name: string;
  private events: DomainEvent;
  constructor(events: DomainEvent) {
    this.name = events.getEventName();
    this.events = events;
  }
  getEventName(): string {
    return this.name;
  }
  getEvent(): DomainEvent {
    return this.events;
  }
}

export default StoredEvent;
