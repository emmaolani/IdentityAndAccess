import DomainEvent from "./domainEvent";
import DomainEventSubscriber from "./domainEventSubscriber";

// TODO: make publish differentiate between All and array specific event
class DomainEventPublisher {
  private subscribers: DomainEventSubscriber[];

  constructor() {
    this.subscribers = [];
  }

  subscribe(subscriber: DomainEventSubscriber) {
    this.subscribers.push(subscriber);
  }

  publish(domainEvent: DomainEvent) {
    this.subscribers.forEach((subscriber) => {
      if (
        subscriber
          .getSubscribedEventNames()
          .includes(domainEvent.getEventName()) ||
        subscriber.getSubscribedEventNames().includes("All")
      ) {
        subscriber.handleEvent(domainEvent);
      }
    });
  }
}

export default DomainEventPublisher;