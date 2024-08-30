import ValueObject from "../../valueObject";

class VerificationCode extends ValueObject {
  private value: string;
  private timeStamp: number;
  private allowedTimeDurationOfCode: number = 300000;

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
      throw new Error("invalid code");
    }
  }

  private setTimeStamp(aTimeStamp: number) {
    this.checkIfTimeStampIsInvalid(aTimeStamp);
    this.timeStamp = aTimeStamp;
  }

  private checkIfTimeStampIsInvalid(aTimeStamp: number) {
    if (aTimeStamp > Date.now() || aTimeStamp < 0) {
      throw Error("TimeStamp is invalid");
    } else {
      return;
    }
  }

  getValue(): string {
    // checking if verification code has expired
    if (this.isValid()) {
      return this.value;
    } else {
      throw new Error("This code is expired");
    }
  }

  private isValid(): boolean {
    if (Date.now() - this.timeStamp > this.allowedTimeDurationOfCode) {
      return false;
    } else {
      return true;
    }
  }
}

export default VerificationCode;
