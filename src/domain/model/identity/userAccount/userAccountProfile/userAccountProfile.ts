import EmailAddress from "../../../contactDetails/emailAddress";
import PhoneNumber from "../../../contactDetails/phoneNumber";
import VerificationCode from "../../../contactDetails/verificationCode";
import UserAccountId from "../userAccountId";

class UserAccountProfile {
  private userAccountId: UserAccountId;
  private emailAddress: EmailAddress;
  private phoneNumber: PhoneNumber;

  constructor(
    aUserAccountId: UserAccountId,
    aEmailAddress: EmailAddress,
    aPhoneNumber: PhoneNumber
  ) {
    this.setUserAccountId(aUserAccountId);
    this.setEmailAddress(aEmailAddress);
    this.setPhoneNumber(aPhoneNumber);
  }

  private setUserAccountId(aUserAccountId: UserAccountId) {
    this.userAccountId = aUserAccountId;
  }

  private setEmailAddress(aEmailAddress: EmailAddress) {
    this.emailAddress = aEmailAddress;
  }

  private setPhoneNumber(aPhoneNumber: PhoneNumber) {
    this.phoneNumber = aPhoneNumber;
  }

  changeEmailAddress(aEmailAddress: EmailAddress) {
    this.setEmailAddress(aEmailAddress);
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
