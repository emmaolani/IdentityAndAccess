import PhoneNumber from "../../../../src/domain/model/contactDetails/phoneNumber";
import ITUAndISOSpecId from "../../../../src/domain/model/geographicEntities/ITUAndISOSpecId";
import VerificationCode from "../../../../src/domain/model/contactDetails/verificationCode";
import { contactDetailErrorMsg } from "../../../../src/domain/model/contactDetails/contactDetailErrorMsg";
import UUIDGenerator from "../../../../src/port/util/uUIDGenerator";

describe("Unit Test for PhoneNumber class", () => {
  let whiteSpacedPhoneNumber: string = " 123  456 78  ";
  let validPhoneNumber: string = "12345678";
  let ituAndIsoSpecId = new ITUAndISOSpecId(new UUIDGenerator().generate());
  let active: boolean = true;
  let notActive: boolean = false;

  it("should throw an error if phoneNumber is instantiated with a number that does not meet requirement", () => {
    expect(
      () => new PhoneNumber("invalidPhoneNumber", ituAndIsoSpecId, active, null)
    ).toThrow(contactDetailErrorMsg.invalidPhoneNumber);
    expect(
      () =>
        new PhoneNumber(whiteSpacedPhoneNumber, ituAndIsoSpecId, active, null)
    ).toThrow(contactDetailErrorMsg.invalidPhoneNumber);
    expect(() => new PhoneNumber("123", ituAndIsoSpecId, active, null)).toThrow(
      contactDetailErrorMsg.invalidPhoneNumber
    );
    expect(
      () => new PhoneNumber("1".repeat(17), ituAndIsoSpecId, active, null)
    ).toThrow(contactDetailErrorMsg.invalidPhoneNumber); // phone number should not exceed 16 characters
    expect(
      () => new PhoneNumber("123456abc", ituAndIsoSpecId, active, null)
    ).toThrow(contactDetailErrorMsg.invalidPhoneNumber);
    expect(() => new PhoneNumber("", ituAndIsoSpecId, active, null)).toThrow(
      contactDetailErrorMsg.invalidPhoneNumber
    );
    expect(() => new PhoneNumber("   ", ituAndIsoSpecId, active, null)).toThrow(
      contactDetailErrorMsg.invalidPhoneNumber
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
      contactDetailErrorMsg.expiredCode
    );
  });

  it("should not activate phone number with invalid verification code", () => {
    const phoneNumber = new PhoneNumber(
      validPhoneNumber,
      ituAndIsoSpecId,
      notActive,
      createVerificationCode("1234567", Date.now())
    );

    expect(() => phoneNumber.activateWith("123456")).toThrow(
      contactDetailErrorMsg.invalidCode
    );
  });

  it("should throw an error on phone number activation if phone number is already active", () => {
    const phoneNumber = new PhoneNumber(
      validPhoneNumber,
      ituAndIsoSpecId,
      active,
      createVerificationCode("1234567", Date.now())
    );

    expect(() => phoneNumber.activateWith("123456")).toThrow(
      contactDetailErrorMsg.phoneAlreadyActivated
    ); // invalid code used (invalid code should not be checked before 'is phone number active')
  });

  it("should throw an error if no verification code is found in phone number", () => {
    const phoneNumber = new PhoneNumber(
      validPhoneNumber,
      ituAndIsoSpecId,
      notActive,
      null
    );

    expect(() => phoneNumber.activateWith("123456")).toThrow(
      contactDetailErrorMsg.noVerificationCodePhone
    ); // invalid code used (invalid code should not be checked before no verification code is found)
  });

  it("should replace the old verification code with a new verification code", () => {
    const phoneNumber = new PhoneNumber(
      validPhoneNumber,
      ituAndIsoSpecId,
      notActive,
      createVerificationCode("1234567", Date.now() - 500000)
    );

    expect(() => phoneNumber.activateWith("1234567")).toThrow(
      contactDetailErrorMsg.expiredCode
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
