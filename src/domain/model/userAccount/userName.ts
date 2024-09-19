import PersistedValueObject from "../../persistedValueObject";
import { userAccountErrorMsg } from "./userAccountErrorMsg";

class UserName extends PersistedValueObject {
  private value: string;
  private usernameRequirements = /^[a-zA-Z0-9_]{2,15}$/;

  constructor(aValue: string) {
    super();
    this.setValue(aValue);
  }

  setValue(aValue: string) {
    this.assertNoWhiteSpace(
      aValue,
      userAccountErrorMsg.userNameNotMeetingRequirements
    );

    this.assertMatchesRegExp(
      aValue,
      this.usernameRequirements,
      userAccountErrorMsg.userNameNotMeetingRequirements
    );

    this.value = aValue;
  }

  getValue(): string {
    return this.value;
  }

  isEqualTo(username: string): boolean {
    return this.value === username;
  }
}

export default UserName;
