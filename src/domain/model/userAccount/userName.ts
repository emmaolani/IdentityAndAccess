import ValueObject from "../../valueObject";

class UserName extends ValueObject {
  private value: string;

  constructor(aValue: string) {
    super();
    this.setValue(aValue);
  }

  setValue(aValue: string) {
    if (this.IsAnEmpty(aValue)) {
      throw new Error("Username is empty");
    }

    this.value = this.removeWhiteSpace(aValue);
  }

  private IsAnEmpty(aValue: string): boolean {
    return aValue.trim().length === 0; // checking if the string is empty
  }

  private removeWhiteSpace(aValue: string): string {
    return aValue.replace(/\s+/g, "");
  }

  getValue(): string {
    return this.value;
  }

  compare(username: string): boolean {
    return this.value === username;
  }
}

export default UserName;
