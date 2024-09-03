import UserAccountId from "../userAccountId";
import UserAccountProfileId from "./userAccountProfileId";
import EmailAddress from "../../../contactDetails/emailAddress";
import PhoneNumber from "../../../contactDetails/phoneNumber";
import VerificationCode from "../../../contactDetails/verificationCode";

class UserAccountProfile {
  private userAccountProfileId: UserAccountProfileId;
  private userAccountId: UserAccountId;
  private emailAddress: EmailAddress;
  private phoneNumber: PhoneNumber;

  constructor(
    aUserAccountProfileId: UserAccountProfileId,
    aUserAccountId: UserAccountId,
    aEmailAddress: EmailAddress,
    aPhoneNumber: PhoneNumber
  ) {
    this.setUserAccountProfileId(aUserAccountProfileId);
    this.setUserAccountId(aUserAccountId);
    this.setEmailAddress(aEmailAddress);
    this.setPhoneNumber(aPhoneNumber);
  }

  private setUserAccountProfileId(aUserAccountProfileId: UserAccountProfileId) {
    this.userAccountProfileId = aUserAccountProfileId;
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

  getEmailAddress(): string {
    return this.emailAddress.getValue();
  }

  getPhoneNumber(): string {
    return this.phoneNumber.getValue();
  }
}

export default UserAccountProfile;
