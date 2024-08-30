import ValueObject from "../../valueObject";
import VerificationCode from "./verificationCode";

class PhoneNumber extends ValueObject {
  private value: string;
  private ituAndIsoSpecId: string; // This is the ID of the telecom specification that this phone number belongs to
  private isActive: boolean;
  private verificationCode: VerificationCode | null;

  constructor(
    aValue: string,
    aItuAndIsoSpecId: string,
    isActive: boolean,
    aVerificationCode: VerificationCode | null
  ) {
    super();
    this.setValue(aValue);
    this.setItuAndIsoSpecId(aItuAndIsoSpecId);
    this.setActiveStatus(isActive);
    this.setVerificationCode(aVerificationCode);
  }

  private setValue(aValue: string) {
    const newValue = this.removeWhiteSpace(aValue);
    this.value = newValue;
  }

  private removeWhiteSpace(aValue: string): string {
    return aValue.replace(/\s+/g, "");
  }

  private setItuAndIsoSpecId(aItuAndIsoSpecId: string) {
    this.ituAndIsoSpecId = aItuAndIsoSpecId;
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
    if (!this.isActive) {
      throw new Error("Phone number is not active");
    }
    return this.value;
  }

  getItuAndIsoSpecId(): string {
    return this.ituAndIsoSpecId;
  }

  activateWith(code: string) {
    if (this.isActive) {
      throw new Error("Phone number is already activated");
    }

    if (this.verificationCode === null) {
      throw new Error("No verification code found");
    }

    if (this.verificationCode.getValue() !== code) {
      throw new Error("Invalid code");
    }

    this.isActive = true;
    this.removeVerificationCode();
  }

  private removeVerificationCode() {
    this.verificationCode = null;
  }
}

export default PhoneNumber;
