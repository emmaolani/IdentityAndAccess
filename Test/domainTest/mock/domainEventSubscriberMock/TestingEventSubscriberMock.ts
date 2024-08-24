import DomainEventSubscriber from "../../../../src/domain/domainEventSubscriber";
import DomainEvent from "../../../../src/domain/domainEvent";

class TestingEventSubscriber implements DomainEventSubscriber {
  event: DomainEvent;
  expectedEventsType: string | string[];

  constructor(expectedEventsType: string | string[]) {
    this.setExpectedEventsType(expectedEventsType);
  }

  setExpectedEventsType(expectedEventsType: string | string[]) {
    this.expectedEventsType = expectedEventsType;
  }

  getSubscribedEventNames() {
    return this.expectedEventsType;
  }

  handleEvent(domainEvent: DomainEvent) {
    this.event = domainEvent;
  }

  getEvent() {
    return this.event;
  }
}

export default TestingEventSubscriber;
