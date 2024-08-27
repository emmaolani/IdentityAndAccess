import ValueObject from "../../../valueObject";

class UserAccountId extends ValueObject {
  private value: string;

  constructor(aValue: string) {
    super();
    this.setValue(aValue);
  }

  private setValue(aValue: string) {
    this.throwErrorIfUUIDIsValid(aValue);
    this.value = aValue;
  }

  private throwErrorIfUUIDIsValid(aValue: string): boolean {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i; // regex for UUID v4

    return uuidRegex.test(aValue);
  }

  getValue(): string {
    return this.value;
  }
}

export default UserAccountId;
