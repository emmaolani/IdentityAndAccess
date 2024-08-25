import ValueObject from "../../../valueObject";

class UserName extends ValueObject {
  private value: string;

  constructor(aValue: string) {
    super();
    this.setValue(aValue);
  }

  setValue(aValue: string) {
    const value = this.removeWhiteSpace(aValue);

    this.throwErrorIfUsernameDoesNotMeetMinRequirements(value);

    this.value = value;
  }

  private throwErrorIfUsernameDoesNotMeetMinRequirements(aValue: string) {
    const regex = /^[a-zA-Z0-9_]{2,15}$/; // regex for username

    if (aValue.match(regex)) {
      return;
    } else {
      throw new Error("Username does not meet requirements");
    }
  }

  private removeWhiteSpace(aValue: string): string {
    return aValue.replace(/\s+/g, "");
  }

  getValue(): string {
    return this.value;
  }

  compareTo(username: string): boolean {
    return this.value === username;
  }
}

export default UserName;
