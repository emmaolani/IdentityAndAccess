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
      const subscribedTo = subscriber.getSubscribedEventNames();

      if (
        this.subscribedToIsStringAndEqualToEventName(
          subscribedTo,
          domainEvent.getEventName()
        )
      ) {
        subscriber.handleEvent(domainEvent);
      } else if (
        this.subscribedToIsArrayAndContainsEventName(
          subscribedTo,
          domainEvent.getEventName()
        )
      ) {
        subscriber.handleEvent(domainEvent);
      }
    });
  }

  private subscribedToIsStringAndEqualToEventName(
    subscribedTo: string | string[],
    anEventName: string
  ) {
    return (
      typeof subscribedTo === "string" &&
      (subscribedTo === anEventName || "ALL")
    );
  }

  private subscribedToIsArrayAndContainsEventName(
    subscribedToEvent: string | string[],
    anEventName: string
  ) {
    return (
      Array.isArray(subscribedToEvent) &&
      (subscribedToEvent.includes(anEventName) ||
        subscribedToEvent.includes("ALL"))
    );
  }
}

export default DomainEventPublisher;
