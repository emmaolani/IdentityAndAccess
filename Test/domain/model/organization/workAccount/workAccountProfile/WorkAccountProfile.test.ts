import WorkAccountProfile from "../../../../../../src/domain/model/organization/workAccount/workAccountProfile/workAccountProfile";
import FullName from "../../../../../../src/domain/model/organization/workAccount/workAccountProfile/fullName";
import Address from "../../../../../../src/domain/model/organization/workAccount/workAccountProfile/address";
import EmailAddress from "../../../../../../src/domain/model/contactDetails/emailAddress";
import PhoneNumber from "../../../../../../src/domain/model/contactDetails/phoneNumber";
import VerificationCode from "../../../../../../src/domain/model/contactDetails/verificationCode";
import { option } from "../../../../../factories/option";
import PersonalInfoFactory from "../../../../../factories/personalInfoFactory";

/* describe("PersonalInfo", () => {
  const workAccountProfileFactory = new PersonalInfoFactory();

  it("should create PersonalInfo instance", () => {
    const option: option = getSuitableOption("active", "active", "new", "new");

    expect(
      workAccountProfileFactory.getPersonalInfoWith(option)
    ).toBeInstanceOf(WorkAccountProfile);
  });

  it("should change fullName", () => {
    const option: option = getSuitableOption(
      "active",
      "active",
      "null",
      "null"
    );

    const workAccountProfile: WorkAccountProfile =
      workAccountProfileFactory.getPersonalInfoWith(option);

    const newFullName: FullName = new FullName("Jane", "Doe");

    workAccountProfile.changeFullName(newFullName);

    expect(workAccountProfile.getFullName()).toEqual("Jane Doe");
  });

  it("should change address", () => {
    const option: option = getSuitableOption(
      "active",
      "active",
      "null",
      "null"
    );

    const workAccountProfile: WorkAccountProfile =
      workAccountProfileFactory.getPersonalInfoWith(option);

    const newAddress: Address = new Address("newCountryId", "newStateId");

    workAccountProfile.changeAddress(newAddress);

    expect(workAccountProfile.getAddress()).toEqual({
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

    const workAccountProfile: WorkAccountProfile =
      workAccountProfileFactory.getPersonalInfoWith(option);

    let newEmailAddress: EmailAddress = new EmailAddress(
      "nonAdmin@coral.com",
      true,
      null
    );

    workAccountProfile.changeEmailAddress(newEmailAddress);

    expect(workAccountProfile.getEmailAddress()).toEqual("nonAdmin@coral.com");
  });

  // it("should not return email address unless email is activated", () => {
  //   const option: option = getSuitableOption(
  //     "inActive",
  //     "active",
  //     "null",
  //     "new"
  //   );

  //   const workAccountProfile: WorkAccountProfile =
  //     workAccountProfileFactory.getPersonalInfoWith(option);

  //   expect(() => workAccountProfile.getEmailAddress()).toThrow(
  //     "Email is not active"
  //   );

  //   workAccountProfile.activateEmailAddressWith("1234567");

  //   expect(workAccountProfile.getEmailAddress()).toEqual("admin@coral.com");
  // });

  it("should throw an error if email is being activated with wrong code", () => {
    const option: option = getSuitableOption(
      "inActive",
      "active",
      "new",
      "new"
    );

    const workAccountProfile: WorkAccountProfile =
      workAccountProfileFactory.getPersonalInfoWith(option);

    expect(() => workAccountProfile.activateEmailAddressWith("123456")).toThrow(
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

    const workAccountProfile: WorkAccountProfile =
      workAccountProfileFactory.getPersonalInfoWith(option);

    expect(() =>
      workAccountProfile.activateEmailAddressWith("1234567")
    ).toThrow("Email is already activated");
  });

  it("should throw error if email verificationCode is expired", () => {
    const option: option = getSuitableOption(
      "inActive",
      "active",
      "null",
      "expired"
    );

    const workAccountProfile: WorkAccountProfile =
      workAccountProfileFactory.getPersonalInfoWith(option);

    expect(() =>
      workAccountProfile.activateEmailAddressWith("1234567")
    ).toThrow("This code is expired");
  });

  it("should throw an error if no verification code is found in personalInfo email", () => {
    const option: option = getSuitableOption(
      "inActive",
      "active",
      "null",
      "null"
    );

    const workAccountProfile: WorkAccountProfile =
      workAccountProfileFactory.getPersonalInfoWith(option);

    expect(() =>
      workAccountProfile.activateEmailAddressWith("1234567")
    ).toThrow("No verification code found");
  });

  it("should replace email verification code with new verification code", () => {
    const option: option = getSuitableOption(
      "inActive",
      "active",
      "null",
      "expired"
    );

    const workAccountProfile: WorkAccountProfile =
      workAccountProfileFactory.getPersonalInfoWith(option);

    expect(() =>
      workAccountProfile.activateEmailAddressWith("1234567")
    ).toThrow("This code is expired");

    workAccountProfile.replaceEmailVerificationCodeWith(
      new VerificationCode("7654321", Date.now())
    );

    workAccountProfile.activateEmailAddressWith("7654321");

    expect(workAccountProfile.getEmailAddress()).toEqual("admin@coral.com");
  });

  it("should change phone number", () => {
    const option: option = getSuitableOption(
      "active",
      "active",
      "null",
      "null"
    );

    const workAccountProfile: WorkAccountProfile =
      workAccountProfileFactory.getPersonalInfoWith(option);

    workAccountProfile.changePhoneNumber(
      new PhoneNumber("223456789", "Id", true, null)
    );

    expect(workAccountProfile.getPhoneNumber()).toEqual("223456789");
  });

  // it("should not return phone number unless phone is activated", () => {
  //   const option: option = getSuitableOption(
  //     "active",
  //     "inActive",
  //     "new",
  //     "null"
  //   );

  //   const workAccountProfile: WorkAccountProfile =
  //     workAccountProfileFactory.getPersonalInfoWith(option);

  //   expect(() => workAccountProfile.getPhoneNumber()).toThrow(
  //     "Phone number is not active"
  //   );

  //   workAccountProfile.activatePhoneNumberWith("1234567");

  //   expect(workAccountProfile.getPhoneNumber()).toEqual("123456789");
  // });

  it("should throw an error if phone is being activated with wrong code", () => {
    const option: option = getSuitableOption(
      "active",
      "inActive",
      "new",
      "null"
    );

    const workAccountProfile: WorkAccountProfile =
      workAccountProfileFactory.getPersonalInfoWith(option);

    expect(() => workAccountProfile.activatePhoneNumberWith("123456")).toThrow(
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

    const workAccountProfile: WorkAccountProfile =
      workAccountProfileFactory.getPersonalInfoWith(option);

    expect(() => workAccountProfile.activatePhoneNumberWith("1234567")).toThrow(
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

    const workAccountProfile: WorkAccountProfile =
      workAccountProfileFactory.getPersonalInfoWith(option);

    expect(() => workAccountProfile.activatePhoneNumberWith("1234567")).toThrow(
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

    const workAccountProfile: WorkAccountProfile =
      workAccountProfileFactory.getPersonalInfoWith(option);

    expect(() => workAccountProfile.activatePhoneNumberWith("1234567")).toThrow(
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

    const workAccountProfile: WorkAccountProfile =
      workAccountProfileFactory.getPersonalInfoWith(option);

    expect(() => workAccountProfile.activatePhoneNumberWith("1234567")).toThrow(
      "This code is expired"
    );

    workAccountProfile.replacePhoneVerificationCodeWith(
      new VerificationCode("7654321", Date.now())
    );

    workAccountProfile.activatePhoneNumberWith("7654321");

    expect(workAccountProfile.getPhoneNumber()).toEqual("123456789");
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
*/
