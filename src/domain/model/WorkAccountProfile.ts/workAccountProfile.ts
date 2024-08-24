import Address from "./address";
import FullName from "./fullName";
import WorkEmailAddress from "./WorkEmailAddress";
import WorkPhoneNumber from "./WorkPhoneNumber";
import VerificationCode from "./verificationCode";

class WorkAccountProfile {
  private fullName: FullName;
  private address: Address;
  private emailAddress: WorkEmailAddress;
  private phoneNumber: WorkPhoneNumber;

  constructor(
    fullName: FullName,
    address: Address,
    emailAddress: WorkEmailAddress,
    phoneNumber: WorkPhoneNumber
  ) {
    this.setFullName(fullName);
    this.setAddress(address);
    this.setEmailAddress(emailAddress);
    this.setPhoneNumber(phoneNumber);
  }

  private setFullName(fullName: FullName) {
    this.fullName = fullName;
  }

  private setAddress(address: Address) {
    this.address = address;
  }

  private setEmailAddress(emailAddress: WorkEmailAddress) {
    this.emailAddress = emailAddress;
  }

  private setPhoneNumber(phoneNumber: WorkPhoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  changeFullName(fullName: FullName) {
    this.setFullName(fullName);
  }

  changeAddress(address: Address) {
    this.setAddress(address);
  }

  changeEmailAddress(emailAddress: WorkEmailAddress) {
    this.setEmailAddress(emailAddress);
  }

  changePhoneNumber(phoneNumber: WorkPhoneNumber) {
    this.setPhoneNumber(phoneNumber);
  }

  replaceEmailVerificationCodeWith(aVerificationCode: VerificationCode) {
    this.emailAddress.replaceVerificationCodeWith(aVerificationCode);
  }

  replacePhoneVerificationCodeWith(aVerificationCode: VerificationCode) {
    this.phoneNumber.replaceVerificationCodeWith(aVerificationCode);
  }

  getFullName(): string {
    return this.fullName.getFullName();
  }

  getAddress(): { addressCountryId: string; addressStateId: string } {
    return this.address.getAddress();
  }

  getEmailAddress(): string {
    return this.emailAddress.getValue();
  }

  getPhoneNumber(): string {
    return this.phoneNumber.getValue();
  }

  activatePhoneNumberWith(code: string) {
    this.phoneNumber.activateWith(code);
  }

  activateEmailAddressWith(code: string) {
    this.emailAddress.activateWith(code);
  }
}

export default WorkAccountProfile;
