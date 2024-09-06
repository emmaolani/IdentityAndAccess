import EventStore from "../../../src/domain/eventStore";
import DomainEvent from "../../../src/domain/domainEvent";
import FakeDb from "./fakeDb";

class EventStoreMock implements EventStore {
  private DB = new FakeDb();
  private domainEvent: DomainEvent;

  constructor(aDB: FakeDb) {
    this.DB = aDB;
  }

  async append(anEvent: DomainEvent): Promise<void> {
    this.DB.save(anEvent.getEventName(), anEvent);
  }

  async getAllEventWithName(name: string): Promise<DomainEvent[]> {
    const events: DomainEvent[] = [];
    this.DB.getById(name).forEach((event: DomainEvent) => {
      events.push(event);
    });
    return events;
  }
}

export default EventStoreMock;
