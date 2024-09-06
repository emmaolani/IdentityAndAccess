import DomainEvent from "./domainEvent";

interface EventStore {
  append(event: DomainEvent): Promise<void>;
  getAllEventWithName(name: string): Promise<DomainEvent[]>;
}

export default EventStore;
