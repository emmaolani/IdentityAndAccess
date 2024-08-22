import DomainEvent from "./domainEvent";

interface DomainEventSubscriber {
  handleEvent(event: DomainEvent): void;
  subscribeToEventType(): string[];
}

export default DomainEventSubscriber;
