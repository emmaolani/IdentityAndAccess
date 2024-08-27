import DomainEvent from "../../../domainEvent";

class NewUserAccountCreated implements DomainEvent {
  private eventName: string;
  private occurredOn: Date;
  private userAccountId: string;
  private userName: string;

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
    this.userAccountId = aUserAccountId;
  }

  setUserName(aUserName: string) {
    this.userName = aUserName;
  }

  getEventName(): string {
    return this.eventName;
  }

  getOccurredOn(): Date {
    return this.occurredOn;
  }

  getUserAccountId(): string {
    return this.userAccountId;
  }

  getUserName(): string {
    return this.userName;
  }
}

export default NewUserAccountCreated;
