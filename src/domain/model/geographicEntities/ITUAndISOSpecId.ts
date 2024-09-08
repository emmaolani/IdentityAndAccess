import ValueObject from "../../valueObject";
import { ITUAndISOSpecIdIdError } from "../../enum/errorMsg/iTUAndISOErrorMsg";

class ITUAndISOSpecId extends ValueObject {
  private value: string;

  constructor(value: string) {
    super();
    this.setValue(value);
  }

  private setValue(value: string) {
    this.throwErrorIfUUIDIsValid(value);
    this.value = value;
  }

  private throwErrorIfUUIDIsValid(aValue: string): void {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i; // regex for UUID v4

    if (!uuidRegex.test(aValue)) {
      throw new Error(ITUAndISOSpecIdIdError.invalidUUID);
    }
  }

  getValue(): string {
    return this.value;
  }
}

export default ITUAndISOSpecId;