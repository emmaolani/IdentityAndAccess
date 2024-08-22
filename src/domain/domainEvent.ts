interface DomainEvent {
  occurredOn(): Date;
  eventName(): string;
}

export default DomainEvent;
