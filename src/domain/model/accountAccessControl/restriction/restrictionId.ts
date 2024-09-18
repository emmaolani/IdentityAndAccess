import { restrictionErrorMsg } from "./restrictionErrorMsg";

class RestrictionId {
  private id: string;

  constructor(aValue: string) {
    this.setValue(aValue);
  }

  private setValue(aValue: string) {
    this.throwErrorIfUUIDIsInValid(aValue);

    this.id = aValue;
  }

  private throwErrorIfUUIDIsInValid(aValue: string): void {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i; // regex for UUID v4

    if (!uuidRegex.test(aValue)) {
      throw new Error(restrictionErrorMsg.invalidUUID);
    }
  }

  getId(): string {
    return this.id;
  }
}

export default RestrictionId;
