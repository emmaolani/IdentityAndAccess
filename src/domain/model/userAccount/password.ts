import ValueObject from "../../valueObject";

class Password extends ValueObject {
  private value: string;

  constructor(aValue: string) {
    super();
    this.setValue(aValue);
  }

  private setValue(aValue: string) {
    if (this.IsAnEmpty(aValue)) {
      throw new Error("password is empty");
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

  compare(password: string): boolean {
    return this.value === password;
  }
}

export default Password;
