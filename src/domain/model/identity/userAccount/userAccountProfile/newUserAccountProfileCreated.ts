import DomainEvent from "../../../../domainEvent";
import EventName from "../../../../enum/event/eventName";

class NewUserAccountProfileCreated implements DomainEvent {
  private userAccountProfileId: string;
  private userAccountId: string;
  private occurredOn: Date;
  private eventName: string;

  constructor(userAccountProfileId: string, userAccountId: string) {
    this.userAccountProfileId = userAccountProfileId;
    this.userAccountId = userAccountId;
    this.occurredOn = new Date();
    this.eventName = EventName.NewUserAccountProfileCreated;
  }

  getOccurredOn(): Date {
    return this.occurredOn;
  }

  getEventName(): string {
    return this.eventName;
  }
}

export default NewUserAccountProfileCreated;
