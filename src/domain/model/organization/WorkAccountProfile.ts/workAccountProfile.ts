import Address from "./address";
import FullName from "./fullName";
import EmailAddress from "../../contactDetails/emailAddress";
import PhoneNumber from "../../contactDetails/phoneNumber";
import VerificationCode from "../../contactDetails/verificationCode";

class WorkAccountProfile {
  private fullName: FullName;
  private address: Address;
  private emailAddress: EmailAddress;
  private phoneNumber: PhoneNumber;

  constructor(
    fullName: FullName,
    address: Address,
    emailAddress: EmailAddress,
    phoneNumber: PhoneNumber
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

  private setEmailAddress(emailAddress: EmailAddress) {
    this.emailAddress = emailAddress;
  }

  private setPhoneNumber(phoneNumber: PhoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  changeFullName(fullName: FullName) {
    this.setFullName(fullName);
  }

  changeAddress(address: Address) {
    this.setAddress(address);
  }

  changeEmailAddress(emailAddress: EmailAddress) {
    this.setEmailAddress(emailAddress);
  }

  changePhoneNumber(phoneNumber: PhoneNumber) {
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
