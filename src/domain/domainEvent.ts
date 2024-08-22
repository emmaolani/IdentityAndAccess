interface DomainEvent {
  occurredOn(): Date;
  getEventName(): string;
}

export default DomainEvent;
