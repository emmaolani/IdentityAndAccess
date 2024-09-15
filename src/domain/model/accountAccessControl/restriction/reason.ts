import { reasonError } from "../../../enum/errorMsg/restrictionErrorMsg";

class Reason {
  private reason: string;

  constructor(aReason: string) {
    this.setReason(aReason);
  }

  private setReason(aReason: string) {
    this.throwErrorIfReasonIsEmptyString(aReason);

    this.reason = aReason;
  }

  private throwErrorIfReasonIsEmptyString(aReason: string) {
    const regex = /^\s*$/; // empty string or whitespace

    if (regex.test(aReason)) {
      throw new Error(reasonError.invalidReason);
    }
  }
}

export default Reason;
