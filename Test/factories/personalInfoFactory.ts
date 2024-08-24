import WorkAccountProfile from "../../src/domain/model/WorkAccountProfile.ts/workAccountProfile";
import FullName from "../../src/domain/model/WorkAccountProfile.ts/fullName";
import Address from "../../src/domain/model/WorkAccountProfile.ts/address";
import WorkEmailAddress from "../../src/domain/model/WorkAccountProfile.ts/WorkEmailAddress";
import WorkPhoneNumber from "../../src/domain/model/WorkAccountProfile.ts/WorkPhoneNumber";
import VerificationCode from "../../src/domain/model/WorkAccountProfile.ts/verificationCode";
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

  private getEmailWith(anOption: option): WorkEmailAddress {
    const verificationCode = this.getVerificationCode(
      anOption.emailVerificationCodeType
    );

    if (anOption.emailType === "active") {
      return new WorkEmailAddress("admin@coral.com", true, verificationCode);
    } else if (anOption.emailType === "inActive") {
      return new WorkEmailAddress("admin@coral.com", false, verificationCode);
    }

    throw new Error("Invalid option type");
  }

  private getPhoneNumber(anOption: option): WorkPhoneNumber {
    const verificationCode = this.getVerificationCode(
      anOption.phoneVerificationCodeType
    );

    if (anOption.phoneType === "active") {
      return new WorkPhoneNumber("123456789", "specId", true, verificationCode);
    } else if (anOption.phoneType === "inActive") {
      return new WorkPhoneNumber(
        "123456789",
        "specId",
        false,
        verificationCode
      );
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
