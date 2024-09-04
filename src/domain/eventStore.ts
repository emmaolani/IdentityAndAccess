import DomainEvent from "./domainEvent";

interface EventStore {
  append(event: DomainEvent): Promise<void>;
}

export default EventStore;
