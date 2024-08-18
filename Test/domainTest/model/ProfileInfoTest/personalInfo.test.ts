import PersonalInfo from "../../../../src/domain/model/PersonalInfo/personalInfo";
import FullName from "../../../../src/domain/model/PersonalInfo/fullName";
import BirthDate from "../../../../src/domain/model/PersonalInfo/birthDate";
import Address from "../../../../src/domain/model/PersonalInfo/address";
import EmailAddress from "../../../../src/domain/model/PersonalInfo/emailAddress";
import PhoneNumber from "../../../../src/domain/model/PersonalInfo/phoneNumber";
import VerificationCode from "../../../../src/domain/model/PersonalInfo/verificationCode";
import { option } from "../../../factories/option";
import PersonalInfoFactory from "../../../factories/personalInfoFactory";

describe("PersonalInfo", () => {
  const personalInfoFactory = new PersonalInfoFactory();

  it("should create PersonalInfo instance", () => {
    const option: option = getSuitableOption("active", "active", "new", "new");

    expect(personalInfoFactory.getPersonalInfoWith(option)).toBeInstanceOf(
      PersonalInfo
    );
  });

  it("should change fullName", () => {
    const option: option = getSuitableOption(
      "active",
      "active",
      "null",
      "null"
    );

    const personalInfo: PersonalInfo =
      personalInfoFactory.getPersonalInfoWith(option);

    const newFullName: FullName = new FullName("Jane", "Doe");

    personalInfo.changeFullName(newFullName);

    expect(personalInfo.getFullName()).toEqual("Jane Doe");
  });

  it("should change birthDate", () => {
    const option: option = getSuitableOption(
      "active",
      "active",
      "null",
      "null"
    );

    const personalInfo: PersonalInfo =
      personalInfoFactory.getPersonalInfoWith(option);

    const newBirthDate: BirthDate = new BirthDate("1990-01-02");

    personalInfo.changeBirthDate(newBirthDate);

    expect(personalInfo.getBirthDate()).toEqual("1990-01-02");
  });

  it("should change address", () => {
    const option: option = getSuitableOption(
      "active",
      "active",
      "null",
      "null"
    );

    const personalInfo: PersonalInfo =
      personalInfoFactory.getPersonalInfoWith(option);

    const newAddress: Address = new Address("newCountryId", "newStateId");

    personalInfo.changeAddress(newAddress);

    expect(personalInfo.getAddress()).toEqual({
      addressCountryId: "newCountryId",
      addressStateId: "newStateId",
    });
  });

  it("should change email address", () => {
    const option: option = getSuitableOption(
      "active",
      "active",
      "null",
      "null"
    );

    let personalInfo: PersonalInfo =
      personalInfoFactory.getPersonalInfoWith(option);

    let newEmailAddress: EmailAddress = new EmailAddress(
      "nonAdmin@coral.com",
      true,
      null
    );

    personalInfo.changeEmailAddress(newEmailAddress);

    expect(personalInfo.getEmailAddress()).toEqual("nonAdmin@coral.com");
  });

  it("should not return email address unless email is activated", () => {
    const option: option = getSuitableOption(
      "inActive",
      "active",
      "null",
      "new"
    );

    const personalInfo: PersonalInfo =
      personalInfoFactory.getPersonalInfoWith(option);

    expect(() => personalInfo.getEmailAddress()).toThrow("Email is not active");

    personalInfo.activateEmailAddressWith("1234567");

    expect(personalInfo.getEmailAddress()).toEqual("admin@coral.com");
  });

  it("should throw an error if email is being activated with wrong code", () => {
    const option: option = getSuitableOption(
      "inActive",
      "active",
      "new",
      "new"
    );

    const personalInfo: PersonalInfo =
      personalInfoFactory.getPersonalInfoWith(option);

    expect(() => personalInfo.activateEmailAddressWith("123456")).toThrow(
      "Invalid code"
    );
  });

  it("should throw an error if an active-email is being activated", () => {
    const option: option = getSuitableOption(
      "active",
      "active",
      "null",
      "null"
    );

    const personalInfo: PersonalInfo =
      personalInfoFactory.getPersonalInfoWith(option);

    expect(() => personalInfo.activateEmailAddressWith("1234567")).toThrow(
      "Email is already activated"
    );
  });

  it("should throw error if email verificationCode is expired", () => {
    const option: option = getSuitableOption(
      "inActive",
      "active",
      "null",
      "expired"
    );

    const personalInfo: PersonalInfo =
      personalInfoFactory.getPersonalInfoWith(option);

    expect(() => personalInfo.activateEmailAddressWith("1234567")).toThrow(
      "This code is expired"
    );
  });

  it("should throw an error if no verification code is found in personalInfo email", () => {
    const option: option = getSuitableOption(
      "inActive",
      "active",
      "null",
      "null"
    );

    const personalInfo: PersonalInfo =
      personalInfoFactory.getPersonalInfoWith(option);

    expect(() => personalInfo.activateEmailAddressWith("1234567")).toThrow(
      "No verification code found"
    );
  });

  it("should replace email verification code with new verification code", () => {
    const option: option = getSuitableOption(
      "inActive",
      "active",
      "null",
      "expired"
    );

    const personalInfo: PersonalInfo =
      personalInfoFactory.getPersonalInfoWith(option);

    expect(() => personalInfo.activateEmailAddressWith("1234567")).toThrow(
      "This code is expired"
    );

    personalInfo.replaceEmailVerificationCodeWith(
      new VerificationCode("7654321", Date.now())
    );

    personalInfo.activateEmailAddressWith("7654321");

    expect(personalInfo.getEmailAddress()).toEqual("admin@coral.com");
  });

  it("should change phone number", () => {
    const option: option = getSuitableOption(
      "active",
      "active",
      "null",
      "null"
    );

    let personalInfo: PersonalInfo =
      personalInfoFactory.getPersonalInfoWith(option);

    personalInfo.changePhoneNumber(
      new PhoneNumber("223456789", "Id", true, null)
    );

    expect(personalInfo.getPhoneNumber()).toEqual("223456789");
  });

  it("should not return phone number unless phone is activated", () => {
    const option: option = getSuitableOption(
      "active",
      "inActive",
      "new",
      "null"
    );

    const personalInfo: PersonalInfo =
      personalInfoFactory.getPersonalInfoWith(option);

    expect(() => personalInfo.getPhoneNumber()).toThrow(
      "Phone number is not active"
    );

    personalInfo.activatePhoneNumberWith("1234567");

    expect(personalInfo.getPhoneNumber()).toEqual("123456789");
  });

  it("should throw an error if phone is being activated with wrong code", () => {
    const option: option = getSuitableOption(
      "active",
      "inActive",
      "new",
      "null"
    );

    const personalInfo: PersonalInfo =
      personalInfoFactory.getPersonalInfoWith(option);

    expect(() => personalInfo.activatePhoneNumberWith("123456")).toThrow(
      "Invalid code"
    );
  });

  it("should throw an error if an active-phone is being activated", () => {
    const option: option = getSuitableOption(
      "active",
      "active",
      "null",
      "null"
    );

    const personalInfo: PersonalInfo =
      personalInfoFactory.getPersonalInfoWith(option);

    expect(() => personalInfo.activatePhoneNumberWith("1234567")).toThrow(
      "Phone number is already activated"
    );
  });

  it("should throw error if phone verificationCode is expired", () => {
    const option: option = getSuitableOption(
      "active",
      "inActive",
      "expired",
      "null"
    );

    const personalInfo: PersonalInfo =
      personalInfoFactory.getPersonalInfoWith(option);

    expect(() => personalInfo.activatePhoneNumberWith("1234567")).toThrow(
      "This code is expired"
    );
  });

  it("should throw an error if no verification code is found in personalInfo phoneNumber", () => {
    const option: option = getSuitableOption(
      "active",
      "inActive",
      "null",
      "null"
    );

    const personalInfo: PersonalInfo =
      personalInfoFactory.getPersonalInfoWith(option);

    expect(() => personalInfo.activatePhoneNumberWith("1234567")).toThrow(
      "No verification code found"
    );
  });

  it("should replace phone verification code with new verification code", () => {
    const option: option = getSuitableOption(
      "active",
      "inActive",
      "expired",
      "null"
    );

    const personalInfo: PersonalInfo =
      personalInfoFactory.getPersonalInfoWith(option);

    expect(() => personalInfo.activatePhoneNumberWith("1234567")).toThrow(
      "This code is expired"
    );

    personalInfo.replacePhoneVerificationCodeWith(
      new VerificationCode("7654321", Date.now())
    );

    personalInfo.activatePhoneNumberWith("7654321");

    expect(personalInfo.getPhoneNumber()).toEqual("123456789");
  });
});

// function used to retrieve suitable option to create personalInfo object in personalInfoFactory
function getSuitableOption(
  aEmailType: "active" | "inActive",
  aPhoneType: "active" | "inActive",
  aPhoneVerificationCodeType: "new" | "expired" | "null",
  emailVerificationCodeType: "new" | "expired" | "null"
): option {
  const option: option = {
    emailType: aEmailType,
    phoneType: aPhoneType,
    phoneVerificationCodeType: aPhoneVerificationCodeType,
    emailVerificationCodeType: emailVerificationCodeType,
  };

  return option;
}
