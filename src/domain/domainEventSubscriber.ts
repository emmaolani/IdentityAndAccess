import DomainEvent from "./domainEvent";

interface DomainEventSubscriber {
  handleEvent(event: DomainEvent): Promise<void>;
  getSubscribedEventNames(): string[] | string;
}

export default DomainEventSubscriber;
