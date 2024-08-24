import DomainEvent from "./domainEvent";

interface DomainEventSubscriber {
  handleEvent(event: DomainEvent): void;
  getSubscribedEventNames(): string[];
}

export default DomainEventSubscriber;
