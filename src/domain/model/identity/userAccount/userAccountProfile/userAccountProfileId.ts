import EntityValueObject from "../../../../EntityValueObject";
import { UserAccountProfileIdError } from "../../../../enum/errorMsg/userAccountProfileErrorMsg";

class UserAccountProfileId extends EntityValueObject {
  private id: string;

  constructor(aValue: string) {
    super();
    this.setValue(aValue);
  }

  private setValue(aValue: string) {
    this.throwErrorIfUUIDIsValid(aValue);
    this.id = aValue;
  }

  private throwErrorIfUUIDIsValid(aValue: string): void {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i; // regex for UUID v4

    if (!uuidRegex.test(aValue)) {
      throw new Error(UserAccountProfileIdError.invalidUUID);
    }
  }

  getId(): string {
    return this.id;
  }
}

export default UserAccountProfileId;
