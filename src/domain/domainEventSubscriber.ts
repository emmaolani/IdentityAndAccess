import DomainEvent from "./domainEvent";

interface DomainEventSubscriber {
  handleEvent(event: DomainEvent): void;
  getSubscribedEventNames(): string[] | string;
}

export default DomainEventSubscriber;
