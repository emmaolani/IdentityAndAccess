import EventStore from "../../../src/domain/eventStore";
import DomainEvent from "../../../src/domain/domainEvent";
import NewUserAccountCreated from "../../../src/domain/model/identity/userAccount/newUserAccountCreated";

class EventStoreMock implements EventStore {
  private domainEvent: DomainEvent;

  async append(anEvent: DomainEvent): Promise<void> {
    this.domainEvent = anEvent;
  }

  getAllStoredEvents(): DomainEvent {
    return this.domainEvent;
  }
}

export default EventStoreMock;
