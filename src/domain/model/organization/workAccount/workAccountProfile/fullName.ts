import PersistentValueObject from "../../../../EntityValueObject";
import workAccountProfileErrorMsg from "./workAccountProfileErrorMsg";

class FullName extends PersistentValueObject {
  private name: string;

  constructor(aName: string) {
    super();
    this.setName(aName);
  }

  getFullName(): string {
    return this.name;
  }

  private setName(aName: string): void {
    if (this.IsAnEmpty(aName)) {
      throw new Error(workAccountProfileErrorMsg.emptyName);
    }

    this.name = this.returnValidatedName(aName);
  }

  private IsAnEmpty(aName: string): boolean {
    return aName.trim().length === 0; // checking if the string is empty
  }

  private returnValidatedName(aName: string): string {
    let validName: string = aName;

    validName = validName.replace(/\s{2,}/gi, " "); // replacing multiple white space between words with single white space
    validName = validName.replace(/^\s+/gi, ""); // removes white space at the beginning of the string
    validName = validName.replace(/\s+$/gi, ""); // removes white space at the end of the string

    return validName;
  }
}

export default FullName;
