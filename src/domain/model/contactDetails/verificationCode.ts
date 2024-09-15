import EntityValueObject from "../../EntityValueObject";
import { verificationCodeError } from "../../enum/errorMsg/contactDetailErrorMsg";

class VerificationCode extends EntityValueObject {
  private value: string;
  private timeStamp: number;
  private allowedTimeDurationOfCode: number = 300000; // 5 minutes

  constructor(aValue: string, aTimeStamp: number) {
    super();
    this.setValue(aValue);
    this.setTimeStamp(aTimeStamp);
  }

  private setValue(aValue: string) {
    this.throwErrorIfCodeIsNotValid(aValue);
    this.value = aValue;
  }

  private throwErrorIfCodeIsNotValid(aValue: string) {
    const sevenDigitRegex = /^\d{7}$/;

    if (!sevenDigitRegex.test(aValue)) {
      throw new Error(verificationCodeError.invalidCode);
    }
  }

  private setTimeStamp(aTimeStamp: number) {
    this.checkIfTimeStampIsInvalid(aTimeStamp);
    this.timeStamp = aTimeStamp;
  }

  private checkIfTimeStampIsInvalid(aTimeStamp: number) {
    if (aTimeStamp > Date.now() || aTimeStamp < 0) {
      throw Error(verificationCodeError.invalidTimeStamp);
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
      throw new Error(verificationCodeError.expiredCode);
    }
  }

  private throwErrorIfCodeDoesNotMatch(code: string) {
    if (this.value !== code) {
      throw new Error(verificationCodeError.invalidCode);
    }
  }
}

export default VerificationCode;
