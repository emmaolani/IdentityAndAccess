import EntityValueObject from "../../../EntityValueObject";
import { userNamesError } from "../../../enum/errorMsg/userAccountErrorMsg";

class UserName extends EntityValueObject {
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

  private removeWhiteSpace(aValue: string): string {
    return aValue.replace(/\s+/g, "");
  }

  private throwErrorIfUsernameDoesNotMeetMinRequirements(aValue: string) {
    const regex = /^[a-zA-Z0-9_]{2,15}$/; // this regex defines the requirement for a valid username

    if (aValue.match(regex)) {
      return;
    } else {
      throw new Error(userNamesError.userNameNotMeetingRequirements);
    }
  }

  getValue(): string {
    return this.value;
  }

  isEqualTo(username: string): boolean {
    return this.value === username;
  }
}

export default UserName;
