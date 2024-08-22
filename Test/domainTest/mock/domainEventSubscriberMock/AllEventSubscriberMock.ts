import DomainEventSubscriber from "../../../../src/domain/domainEventSubscriber";
import DomainEvent from "../../../../src/domain/domainEvent";

class AllEventSubscriber implements DomainEventSubscriber {
  event: DomainEvent;
  expectedEventsType: string[] = ["All"];

  subscribeToEventType() {
    return this.expectedEventsType;
  }

  handleEvent(domainEvent: DomainEvent) {
    this.event = domainEvent;
  }

  getEvent() {
    return this.event;
  }
}

export default AllEventSubscriber;
