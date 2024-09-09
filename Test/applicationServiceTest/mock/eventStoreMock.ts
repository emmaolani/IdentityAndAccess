import EventStore from "../../../src/domain/eventStore";
import DomainEvent from "../../../src/domain/domainEvent";
import FakeDb from "./fakeDb/fakeDb";
import StoredEventMock from "./storedEventMock";

class EventStoreMock implements EventStore {
  private db: FakeDb;

  constructor(aDB: FakeDb) {
    this.db = aDB;
  }

  async append(anEvent: DomainEvent): Promise<void> {
    this.db.save(new StoredEventMock(anEvent));
  }

  async getAllEventWithName(name: string): Promise<DomainEvent[]> {
    const events: DomainEvent[] = [];
    const storedEvent = this.db.find(StoredEventMock, name);

    if (storedEvent instanceof StoredEventMock) {
      events.push(storedEvent.getEvent());
      return events;
    }
    return events;
  }
}

export default EventStoreMock;
