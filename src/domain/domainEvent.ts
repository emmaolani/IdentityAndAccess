interface DomainEvent {
  getOccurredOn(): Date;
  getEventName(): string;
}

export default DomainEvent;
