import DomainEvent from "./domainEvent";
import DomainEventSubscriber from "./domainEventSubscriber";

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
          .subscribeToEventType()
          .includes(domainEvent.getEventName()) ||
        subscriber.subscribeToEventType().includes("All")
      ) {
        subscriber.handleEvent(domainEvent);
      }
    });
  }
}

export default DomainEventPublisher;
