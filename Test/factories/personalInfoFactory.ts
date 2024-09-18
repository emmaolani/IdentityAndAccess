import WorkAccountProfile from "../../src/domain/model/organization/workAccount/workAccountProfile/workAccountProfile";
import FullName from "../../src/domain/model/organization/workAccount/workAccountProfile/fullName";
import Address from "../../src/domain/model/organization/workAccount/workAccountProfile/address";
import EmailAddress from "../../src/domain/model/contactDetails/emailAddress";
import PhoneNumber from "../../src/domain/model/contactDetails/phoneNumber";
import VerificationCode from "../../src/domain/model/contactDetails/verificationCode";
import { option } from "./option";

class PersonalInfoFactory {
  getPersonalInfoWith(anOption: option): WorkAccountProfile {
    const fullName = this.getFullName();
    const address = this.getAddress();
    const emailAddress = this.getEmailWith(anOption);
    const phoneNumber = this.getPhoneNumber(anOption);

    const workAccountProfile: WorkAccountProfile = new WorkAccountProfile(
      fullName,
      address,
      emailAddress,
      phoneNumber
    );

    return workAccountProfile;
  }

  private getFullName(): FullName {
    return new FullName("John", "Doe");
  }

  private getAddress(): Address {
    return new Address("countryId", "stateId");
  }

  private getEmailWith(anOption: option): EmailAddress {
    const verificationCode = this.getVerificationCode(
      anOption.emailVerificationCodeType
    );

    if (anOption.emailType === "active") {
      return new EmailAddress("admin@coral.com", true, verificationCode);
    } else if (anOption.emailType === "inActive") {
      return new EmailAddress("admin@coral.com", false, verificationCode);
    }

    throw new Error("Invalid option type");
  }

  private getPhoneNumber(anOption: option): PhoneNumber {
    const verificationCode = this.getVerificationCode(
      anOption.phoneVerificationCodeType
    );

    if (anOption.phoneType === "active") {
      return new PhoneNumber("123456789", "specId", true, verificationCode);
    } else if (anOption.phoneType === "inActive") {
      return new PhoneNumber("123456789", "specId", false, verificationCode);
    }

    throw new Error("Invalid option type");
  }

  getVerificationCode(type: string): VerificationCode | null {
    if (type === "new") {
      return new VerificationCode("1234567", Date.now());
    } else if (type === "expired") {
      return new VerificationCode("1234567", Date.now() - 500000);
    } else if (type === "null") {
      return null;
    }

    throw new Error("Invalid option type");
  }
}

export default PersonalInfoFactory;
