import PersistedValueObject from "../../persistedValueObject";
import { userAccountErrorMsg } from "./userAccountErrorMsg";

class Password extends PersistedValueObject {
  private value: string;
  private passwordRequirement =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,])[A-Za-z\d@$!%*?&.,]{8,20}$/;

  constructor(aValue: string) {
    super();
    this.setValue(aValue);
  }

  private setValue(aValue: string) {
    this.assertNoWhiteSpace(
      aValue,
      userAccountErrorMsg.passwordNotMeetingRequirements
    );

    this.assertMatchesRegExp(
      aValue,
      this.passwordRequirement,
      userAccountErrorMsg.passwordNotMeetingRequirements
    );

    this.value = aValue;
  }

  getValue(): string {
    return this.value;
  }

  isEqualTo(password: string): boolean {
    return this.value === password;
  }
}

export default Password;
