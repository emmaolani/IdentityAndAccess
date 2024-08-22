import DomainEvent from "./domainEvent";

interface EventStore {
  append<T>(event: DomainEvent): void;
}

export default EventStore;
