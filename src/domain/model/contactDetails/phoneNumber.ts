import PersistedValueObject from "../../persistedValueObject";
import ITUAndISOSpecId from "../geographicEntities/ITUAndISOSpecId";
import VerificationCode from "./verificationCode";
import { contactDetailErrorMsg } from "./contactDetailErrorMsg";

class PhoneNumber extends PersistedValueObject {
  private value: string;
  private iTUAndISOSpecId: ITUAndISOSpecId;
  private isActive: boolean;
  private verificationCode: VerificationCode | null;
  private phoneNumberRequirement = /^\d{4,16}$/;

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
    this.assertNoWhiteSpace(aValue, contactDetailErrorMsg.invalidPhoneNumber);
    this.assertMatchesRegExp(
      aValue,
      this.phoneNumberRequirement,
      contactDetailErrorMsg.invalidPhoneNumber
    );
    this.value = aValue;
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
      throw new Error(contactDetailErrorMsg.phoneAlreadyActivated);
    }

    if (this.verificationCode === null) {
      throw new Error(contactDetailErrorMsg.noVerificationCodePhone);
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
