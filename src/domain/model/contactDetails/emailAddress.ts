import VerificationCode from "./verificationCode";
import PersistedValueObject from "../../persistedValueObject";
import { contactDetailErrorMsg } from "./contactDetailErrorMsg";

class EmailAddress extends PersistedValueObject {
  private value: string;
  private isActive: boolean;
  private verificationCode: VerificationCode | null;
  private emailRequirement = /^(?=.*@)(?=.*\.).{1,254}$/;

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
    this.assertNoWhiteSpace(aValue, contactDetailErrorMsg.invalidEmail);
    this.assertMatchesRegExp(
      aValue,
      this.emailRequirement,
      contactDetailErrorMsg.invalidEmail
    );

    this.value = aValue;
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
      throw new Error(contactDetailErrorMsg.emailAlreadyActivated);
    }

    if (this.verificationCode === null) {
      throw new Error(contactDetailErrorMsg.noVerificationCodeEmail);
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
