import DomainEvent from "../../../src/domain/domainEvent";

class StoredEventMock {
  private name: string;
  private event: DomainEvent;
  constructor(anEvent: DomainEvent) {
    this.name = anEvent.getEventName();
    this.event = anEvent;
  }
  getEventName(): string {
    return this.name;
  }
  getEvent(): DomainEvent {
    return this.event;
  }
}

export default StoredEventMock;
