import PersistedValueObject from "../../persistedValueObject";
import { contactDetailErrorMsg } from "./contactDetailErrorMsg";

class VerificationCode extends PersistedValueObject {
  private value: string;
  private timeStamp: number;
  private allowedTimeDurationOfCode: number = 300000; // 5 minutes
  private codeRequirement = /^\d{7}$/;

  constructor(aValue: string, aTimeStamp: number) {
    super();
    this.setValue(aValue);
    this.setTimeStamp(aTimeStamp);
  }

  private setValue(aValue: string) {
    this.assertMatchesRegExp(
      aValue,
      this.codeRequirement,
      contactDetailErrorMsg.invalidCode
    );

    this.value = aValue;
  }

  private setTimeStamp(aTimeStamp: number) {
    this.throwErrorIfTimeStampIsInvalid(aTimeStamp);
    this.timeStamp = aTimeStamp;
  }

  private throwErrorIfTimeStampIsInvalid(aTimeStamp: number) {
    if (aTimeStamp > Date.now() || aTimeStamp < 0) {
      throw Error(contactDetailErrorMsg.invalidTimeStamp);
    } else {
      return;
    }
  }

  throwErrorIfCodeIsInvalid(code: string) {
    this.throwErrorIfCodeHasExpired();
    this.throwErrorIfCodeDoesNotMatch(code);
  }

  private throwErrorIfCodeHasExpired() {
    if (Date.now() - this.timeStamp > this.allowedTimeDurationOfCode) {
      throw new Error(contactDetailErrorMsg.expiredCode);
    }
  }

  private throwErrorIfCodeDoesNotMatch(code: string) {
    if (this.value !== code) {
      throw new Error(contactDetailErrorMsg.invalidCode);
    }
  }
}

export default VerificationCode;
