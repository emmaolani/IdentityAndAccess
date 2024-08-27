import EventStore from "../../../src/domain/eventStore";
import DomainEvent from "../../../src/domain/domainEvent";
import NewUserAccountCreated from "../../../src/domain/model/identity/userAccount/newUserAccountCreated";

class EventStoreMock implements EventStore {
  private domainEvent: DomainEvent;

  append(anEvent: DomainEvent) {
    this.domainEvent = anEvent;
  }
  getAllStoredEvents(): DomainEvent {
    return this.domainEvent;
  }

  clear() {
    this.domainEvent = new NewUserAccountCreated("id", "default");
  }
}

export default EventStoreMock;
