interface EventStore {
  save<T>(event: T): void;
  getEvents<T>(id: string): T[];
}

export default EventStore;
