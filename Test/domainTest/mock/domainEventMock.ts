import DomainEvent from "../../../src/domain/domainEvent";

class TestingEvent implements DomainEvent {
  EventName: string = "TestingEvent";
  constructor() {}

  occurredOn(): Date {
    return new Date();
  }
  getEventName(): string {
    return this.EventName;
  }
}

export default TestingEvent;
