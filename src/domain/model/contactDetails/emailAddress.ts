import VerificationCode from "./verificationCode";
import ValueObject from "../../valueObject";
import { emailAddressError } from "../../enum/errorMsg/contactDetailErrorMsg";

class EmailAddress extends ValueObject {
  private value: string;
  private isActive: boolean;
  private verificationCode: VerificationCode | null;

  constructor(
    aValue: string,
    aStatus: boolean,
    aVerificationCode: VerificationCode | null
  ) {
    super();
    this.setValue(aValue);
    this.setActiveStatus(aStatus);
    this.setVerificationCode(aVerificationCode);
  }

  private setValue(aValue: string) {
    const newValue = this.removeWhiteSpace(aValue);

    this.throwErrorIfEmailIsInvalid(newValue);
    this.value = newValue;
  }

  private throwErrorIfEmailIsInvalid(aValue: string) {
    const emailRegex = /^(?=.*@)(?=.*\.).{1,254}$/; // this regex defines the requirement for a valid email address

    if (!emailRegex.test(aValue)) {
      throw new Error(emailAddressError.invalidEmail);
    }
  }

  private removeWhiteSpace(aValue: string): string {
    return aValue.replace(/\s+/g, "");
  }

  private setActiveStatus(aStatus: boolean) {
    this.isActive = aStatus;
  }

  private setVerificationCode(aVerificationCode: VerificationCode | null) {
    this.verificationCode = aVerificationCode;
  }

  replaceVerificationCodeWith(aVerificationCode: VerificationCode) {
    this.verificationCode = aVerificationCode;
  }

  getValue(): string {
    return this.value;
  }

  getActiveStatus(): boolean {
    return this.isActive;
  }

  activateWith(code: string) {
    if (this.isActive) {
      throw new Error(emailAddressError.emailAlreadyActivated);
    }

    if (this.verificationCode === null) {
      throw new Error(emailAddressError.noVerificationCode);
    }

    this.verificationCode.throwErrorIfCodeIsInvalid(code);

    this.isActive = true;
    this.removeVerificationCode();
  }

  private removeVerificationCode() {
    this.verificationCode = null;
  }
}

export default EmailAddress;
