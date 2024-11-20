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

  async publish(domainEvent: DomainEvent) {
    this.subscribers.forEach(async (subscriber) => {
      const subscribedTo = subscriber.getSubscribedEventNames();

      if (
        this.subscribedTo_IsStringAndEqualToEventName(
          subscribedTo,
          domainEvent.getEventName()
        )
      ) {
        await subscriber.handleEvent(domainEvent);
      } else if (
        this.subscribedTo_IsArrayAndContainsEventName(
          subscribedTo,
          domainEvent.getEventName()
        )
      ) {
        await subscriber.handleEvent(domainEvent);
      }
    });
  }

  private subscribedTo_IsStringAndEqualToEventName(
    subscribedTo: string | string[],
    anEventName: string
  ) {
    return (
      typeof subscribedTo === "string" &&
      (subscribedTo === anEventName || "ALL")
    );
  }

  private subscribedTo_IsArrayAndContainsEventName(
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
