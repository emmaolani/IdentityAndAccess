import PersistedValueObject from "../../persistedValueObject";
import { userAccountErrorMsg } from "./userAccountErrorMsg";

class Password extends PersistedValueObject {
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

  private removeWhiteSpace(aValue: string): string {
    return aValue.replace(/\s+/g, "");
  }

  private ThrowErrorIfPasswordDontMeetMinRequirements(aValue: string) {
    const regex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,])[A-Za-z\d@$!%*?&.,]{8,20}$/; // this regex defines the requirement for a valid password
    if (aValue.match(regex)) {
      return;
    } else {
      throw new Error(userAccountErrorMsg.passwordNotMeetingRequirements);
    }
  }

  getValue(): string {
    return this.value;
  }

  isEqualTo(password: string): boolean {
    return this.value === password;
  }
}

export default Password;
