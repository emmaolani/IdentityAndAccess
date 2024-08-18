import Address from "./address";
import FullName from "./fullName";
import BirthDate from "./birthDate";
import EmailAddress from "./emailAddress";
import PhoneNumber from "./phoneNumber";
import VerificationCode from "./verificationCode";

class PersonalInfo {
  private fullName: FullName;
  private birthDate: BirthDate;
  private address: Address;
  private emailAddress: EmailAddress;
  private phoneNumber: PhoneNumber;

  constructor(
    fullName: FullName,
    birthDate: BirthDate,
    address: Address,
    emailAddress: EmailAddress,
    phoneNumber: PhoneNumber
  ) {
    this.setFullName(fullName);
    this.setBirthDate(birthDate);
    this.setAddress(address);
    this.setEmailAddress(emailAddress);
    this.setPhoneNumber(phoneNumber);
  }

  private setFullName(fullName: FullName) {
    this.fullName = fullName;
  }

  private setBirthDate(birthDate: BirthDate) {
    this.birthDate = birthDate;
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

  changeBirthDate(birthDate: BirthDate) {
    this.setBirthDate(birthDate);
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

  getBirthDate(): string {
    return this.birthDate.getValue();
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

export default PersonalInfo;
