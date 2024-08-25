import ValueObject from "../../../valueObject";

class Password extends ValueObject {
  private value: string;

  constructor(aValue: string) {
    super();
    this.setValue(aValue);
  }

  private setValue(aValue: string) {
    const value = this.removeWhiteSpace(aValue);

    this.ThrowErrorIfPasswordDontMeetMinRequirements(value);

    this.value = value;
  }

  private ThrowErrorIfPasswordDontMeetMinRequirements(aValue: string) {
    const regex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,])[A-Za-z\d@$!%*?&.,]{8,20}$/; // regex for password

    if (aValue.match(regex)) {
      return;
    } else {
      throw new Error("password does not meet security requirements");
    }
  }

  private removeWhiteSpace(aValue: string): string {
    return aValue.replace(/\s+/g, "");
  }

  getValue(): string {
    return this.value;
  }

  compareTo(password: string): boolean {
    return this.value === password;
  }
}

export default Password;
