import DomainEvent from "../../domainEvent";

class NewUserAccountCreated implements DomainEvent {
  private eventName: string;
  private occurredOn: Date;
  private UserAccountId: string;
  private UserName: string;

  constructor(aUserAccountId: string, aUserName: string) {
    this.setEventName("NewUserAccountCreated");
    this.setOccurredOn(new Date());
    this.setUserAccountId(aUserAccountId);
    this.setUserName(aUserName);
  }

  setEventName(aEventName: string) {
    this.eventName = aEventName;
  }

  setOccurredOn(aOccurredOn: Date) {
    this.occurredOn = aOccurredOn;
  }

  setUserAccountId(aUserAccountId: string) {
    this.UserAccountId = aUserAccountId;
  }

  setUserName(aUserName: string) {
    this.UserName = aUserName;
  }

  getEventName(): string {
    return this.eventName;
  }

  getOccurredOn(): Date {
    return this.occurredOn;
  }

  getUserAccountId(): string {
    return this.UserAccountId;
  }

  getUserName(): string {
    return this.UserName;
  }
}

export default NewUserAccountCreated;
