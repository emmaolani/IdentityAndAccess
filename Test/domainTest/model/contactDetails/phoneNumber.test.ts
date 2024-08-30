import PhoneNumber from "../../../../src/domain/model/contactDetails/phoneNumber";
import VerificationCode from "../../../../src/domain/model/contactDetails/verificationCode";

describe("Unit Test for PhoneNumber class", () => {
  let invalidPhoneNumber: string = " 123  456 78  ";
  let validPhoneNumber: string = "12345678";

  let ituAndIsoSpecId: string = "id";

  let active: boolean = true;
  let notActive: boolean = false;

  let emptyVerificationCode: null = null;
  let expiredVerificationCode: VerificationCode = new VerificationCode(
    "1234567",
    Date.now() - 500000
  );
  let validVerificationCode: VerificationCode = new VerificationCode(
    "1234567",
    Date.now()
  );

  it("should remove white spaces from phone number", () => {
    const phoneNumber = new PhoneNumber(
      invalidPhoneNumber,
      ituAndIsoSpecId,
      active,
      validVerificationCode
    );

    expect(phoneNumber.getValue()).toBe(validPhoneNumber);
  });

  it("should not return phone number unless phoneNumber object is activated", () => {
    const phoneNumber = new PhoneNumber(
      validPhoneNumber,
      ituAndIsoSpecId,
      notActive,
      validVerificationCode
    );

    expect(() => phoneNumber.getValue()).toThrow("Phone number is not active");

    phoneNumber.activateWith(validVerificationCode.getValue());

    expect(phoneNumber.getValue()).toBe(validPhoneNumber);
  });

  it("should return the phoneNumber ITU&ISOspec Id", () => {
    const phoneNumber = new PhoneNumber(
      validPhoneNumber,
      ituAndIsoSpecId,
      active,
      validVerificationCode
    );

    expect(phoneNumber.getItuAndIsoSpecId()).toBe(ituAndIsoSpecId);
  });

  it("should not activate phone number with expired verification code", () => {
    const phoneNumber = new PhoneNumber(
      validPhoneNumber,
      ituAndIsoSpecId,
      notActive,
      expiredVerificationCode
    );

    expect(() =>
      phoneNumber.activateWith(expiredVerificationCode.getValue())
    ).toThrow("This code is expired");
  });

  it("should not activate phone number with invalid verification code", () => {
    const phoneNumber = new PhoneNumber(
      validPhoneNumber,
      ituAndIsoSpecId,
      notActive,
      validVerificationCode
    );

    expect(() => phoneNumber.activateWith("123456")).toThrow("Invalid code");
  });

  it("should throw an error on phone number activation if phone number is already active", () => {
    const phoneNumber = new PhoneNumber(
      validPhoneNumber,
      ituAndIsoSpecId,
      active,
      emptyVerificationCode
    );

    expect(() => phoneNumber.activateWith("1234567")).toThrow(
      "Phone number is already activated"
    );
  });

  it("should replace the old verification code with a new verification code", () => {
    const phoneNumber = new PhoneNumber(
      validPhoneNumber,
      ituAndIsoSpecId,
      notActive,
      expiredVerificationCode
    );

    expect(() => phoneNumber.activateWith("1234567")).toThrow(
      "This code is expired"
    );

    const newVerificationCode: VerificationCode = new VerificationCode(
      "7654321",
      Date.now()
    );

    phoneNumber.replaceVerificationCodeWith(newVerificationCode);

    phoneNumber.activateWith("7654321");

    expect(phoneNumber.getValue()).toBe(validPhoneNumber);
  });
});
