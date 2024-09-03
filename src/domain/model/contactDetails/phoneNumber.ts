import ValueObject from "../../valueObject";
import ITUAndISOSpecId from "../geographicEntities/ITUAndISOSpecId";
import VerificationCode from "./verificationCode";
import { phoneNumberError } from "../../enum/errors/errorMsg";

class PhoneNumber extends ValueObject {
  private value: string;
  private iTUAndISOSpecId: ITUAndISOSpecId;
  private isActive: boolean;
  private verificationCode: VerificationCode | null;

  constructor(
    aValue: string,
    aItuAndIsoSpecId: ITUAndISOSpecId,
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
    this.throwErrorIfPhoneNumberIsInvalid(newValue);
    this.value = newValue;
  }

  private throwErrorIfPhoneNumberIsInvalid(aValue: string) {
    const phoneNumberRegex = /^\d{4,16}$/; // this regex defines the requirement for a valid phone number

    if (!phoneNumberRegex.test(aValue)) {
      throw new Error(phoneNumberError.invalidPhoneNumber);
    }
  }

  private removeWhiteSpace(aValue: string): string {
    return aValue.replace(/\s+/g, "");
  }

  private setItuAndIsoSpecId(aItuAndIsoSpecId: ITUAndISOSpecId) {
    this.iTUAndISOSpecId = aItuAndIsoSpecId;
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

  getItuAndIsoSpecId(): ITUAndISOSpecId {
    return this.iTUAndISOSpecId;
  }

  activateWith(aCode: string) {
    if (this.isActive) {
      throw new Error(phoneNumberError.phoneAlreadyActivated);
    }

    if (this.verificationCode === null) {
      throw new Error(phoneNumberError.noVerificationCode);
    }

    this.verificationCode.throwErrorIfCodeIsInvalid(aCode);

    this.isActive = true;
    this.removeVerificationCode();
  }

  private removeVerificationCode() {
    this.verificationCode = null;
  }
}

export default PhoneNumber;
