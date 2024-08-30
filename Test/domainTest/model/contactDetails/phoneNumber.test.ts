import PhoneNumber from "../../../../src/domain/model/contactDetails/phoneNumber";
import VerificationCode from "../../../../src/domain/model/contactDetails/verificationCode";

describe("Unit Test for PhoneNumber class", () => {
  let invalidPhoneNumber: string = " 123  456 78  ";
  let validPhoneNumber: string = "12345678";

  let ituAndIsoSpecId: string = "id";

  let active: boolean = true;
  let notActive: boolean = false;

  it("should remove white spaces from phone number", () => {
    const phoneNumber = new PhoneNumber(
      invalidPhoneNumber,
      ituAndIsoSpecId,
      active,
      null
    );

    expect(phoneNumber.getValue()).toBe(validPhoneNumber);
  });

  it("should throw an error if phoneNumber is instantiated with a number that does not meet requirement", () => {
    expect(
      () => new PhoneNumber("invalidPhoneNumber", ituAndIsoSpecId, active, null)
    ).toThrow("Invalid phone number");
    expect(() => new PhoneNumber("123", ituAndIsoSpecId, active, null)).toThrow(
      "Invalid phone number"
    );
    expect(
      () => new PhoneNumber("1".repeat(17), ituAndIsoSpecId, active, null)
    ).toThrow("Invalid phone number"); // phone number should not exceed 16 characters
    expect(
      () => new PhoneNumber("123456abc", ituAndIsoSpecId, active, null)
    ).toThrow("Invalid phone number");
    expect(() => new PhoneNumber("", ituAndIsoSpecId, active, null)).toThrow(
      "Invalid phone number"
    );
    expect(() => new PhoneNumber("   ", ituAndIsoSpecId, active, null)).toThrow(
      "Invalid phone number"
    );
  });

  it("should return the activation status of phoneNumber", () => {
    const phoneNumberOne = new PhoneNumber(
      validPhoneNumber,
      ituAndIsoSpecId,
      notActive,
      createVerificationCode("1234567", Date.now())
    );

    const phoneNumberTwo = new PhoneNumber(
      validPhoneNumber,
      ituAndIsoSpecId,
      active,
      null
    );

    expect(phoneNumberOne.getActiveStatus()).toBe(notActive);
    expect(phoneNumberTwo.getActiveStatus()).toBe(active);
  });

  it("should return the phoneNumber ITU&ISOspec Id", () => {
    const phoneNumber = new PhoneNumber(
      validPhoneNumber,
      ituAndIsoSpecId,
      active,
      null
    );

    expect(phoneNumber.getItuAndIsoSpecId()).toBe(ituAndIsoSpecId);
  });

  it("should not activate phone number when verification code has expired", () => {
    const phoneNumber = new PhoneNumber(
      validPhoneNumber,
      ituAndIsoSpecId,
      notActive,
      createVerificationCode("1234567", Date.now() - 500000)
    );

    expect(() => phoneNumber.activateWith("1234567")).toThrow(
      "This code is expired"
    );
  });

  it("should not activate phone number with invalid verification code", () => {
    const phoneNumber = new PhoneNumber(
      validPhoneNumber,
      ituAndIsoSpecId,
      notActive,
      createVerificationCode("1234567", Date.now())
    );

    expect(() => phoneNumber.activateWith("123456")).toThrow("Invalid code");
  });

  it("should throw an error on phone number activation if phone number is already active", () => {
    const phoneNumber = new PhoneNumber(
      validPhoneNumber,
      ituAndIsoSpecId,
      active,
      createVerificationCode("1234567", Date.now())
    );

    expect(() => phoneNumber.activateWith("123456")).toThrow(
      "Phone number is already activated"
    ); // invalid code used (invalid code should not be checked because phone number is already active)
  });

  it("should throw an error if no verification code is found in phone number", () => {
    const phoneNumber = new PhoneNumber(
      validPhoneNumber,
      ituAndIsoSpecId,
      notActive,
      null
    );

    expect(() => phoneNumber.activateWith("123456")).toThrow(
      "No verification code found"
    );
  }); // invalid code used (invalid code should not be checked because no verification code is found)

  it("should replace the old verification code with a new verification code", () => {
    const phoneNumber = new PhoneNumber(
      validPhoneNumber,
      ituAndIsoSpecId,
      notActive,
      createVerificationCode("1234567", Date.now() - 500000)
    );

    expect(() => phoneNumber.activateWith("1234567")).toThrow(
      "This code is expired"
    );

    const newVerificationCode: VerificationCode = new VerificationCode(
      "7654321",
      Date.now()
    );

    phoneNumber.replaceVerificationCodeWith(newVerificationCode);

    expect(() => phoneNumber.activateWith("7654321")).not.toThrow();
  });

  function createVerificationCode(aCode: string, aTimeStamp: number) {
    return new VerificationCode(aCode, aTimeStamp);
  }
});
