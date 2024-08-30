import EmailAddress from "../../../contactDetails/emailAddress";
import PhoneNumber from "../../../contactDetails/phoneNumber";
import VerificationCode from "../../../contactDetails/verificationCode";

class UserAccountProfile {
  private emailAddress: EmailAddress;
  private phoneNumber: PhoneNumber;

  constructor(emailAddress: EmailAddress, phoneNumber: PhoneNumber) {
    this.setEmailAddress(emailAddress);
    this.setPhoneNumber(phoneNumber);
  }

  private setEmailAddress(emailAddress: EmailAddress) {
    this.emailAddress = emailAddress;
  }

  private setPhoneNumber(phoneNumber: PhoneNumber) {
    this.phoneNumber = phoneNumber;
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

export default UserAccountProfile;
