import DomainEventSubscriber from "../../domainEventSubscriber";
import DomainEvent from "../../domainEvent";

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

  async handleEvent(domainEvent: DomainEvent) {
    this.event = domainEvent;
  }

  getEvent() {
    return this.event;
  }
}

export default TestingEventSubscriber;
