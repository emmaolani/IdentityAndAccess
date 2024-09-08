import EventStore from "../../../src/domain/eventStore";
import DomainEvent from "../../../src/domain/domainEvent";
import FakeDb from "./fakeDb/fakeDb";
import StoredEvent from "./storedEvents";

class EventStoreMock implements EventStore {
  private db: FakeDb;

  constructor(aDB: FakeDb) {
    this.db = aDB;
  }

  async append(anEvent: DomainEvent): Promise<void> {
    this.db.save(new StoredEvent(anEvent));
  }

  async getAllEventWithName(name: string): Promise<DomainEvent[]> {
    const events: DomainEvent[] = [];
    const event = this.db.find(StoredEvent, name);

    if (event instanceof StoredEvent) {
      events.push(event.getEvent());
      return events;
    }
    return events;
  }
}

export default EventStoreMock;
