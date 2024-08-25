import ValueObject from "../../../valueObject";

class FullName extends ValueObject {
  private firstName: string;
  private lastName: string;

  constructor(aFirstName: string, aLastName: string) {
    super();
    this.setFirstName(aFirstName);
    this.setLastName(aLastName);
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  private setFirstName(aFirstName: string): void {
    if (this.IsAnEmpty(aFirstName)) {
      throw new Error("first name is empty");
    }

    this.firstName = this.getValid(aFirstName);
  }

  private setLastName(aLastName: string): void {
    if (this.IsAnEmpty(aLastName)) {
      throw new Error("last name is empty");
    }

    this.lastName = this.getValid(aLastName);
  }

  private IsAnEmpty(aName: string): boolean {
    return aName.trim().length === 0; // checking if the string is empty // checking if the string is empty
  }

  private getValid(aName: string): string {
    let validName: string = aName;

    validName = validName.replace(/\s{2,}/gi, " "); // replacing multiple white space between words with single white space
    validName = validName.replace(/^\s+/gi, ""); // removes white space at the beginning of the string
    validName = validName.replace(/\s+$/gi, ""); // removes white space at the end of the string

    return validName;
  }
}

export default FullName;
