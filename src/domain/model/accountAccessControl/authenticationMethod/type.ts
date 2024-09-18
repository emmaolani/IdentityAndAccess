import { authenticationMethodErrorMsg } from "./authenticationMethodErrorMsg";

class Type {
  private type: string;

  constructor(aType: string) {
    this.setName(aType);
  }

  private setName(aType: string) {
    this.throwErrorIfTypeIsEmptyString(aType);

    this.type = aType;
  }

  private throwErrorIfTypeIsEmptyString(aName: string) {
    const regex = /^\s*$/; // empty string or whitespace

    if (regex.test(aName)) {
      throw new Error(authenticationMethodErrorMsg.invalidType);
    }
  }
}

export default Type;
