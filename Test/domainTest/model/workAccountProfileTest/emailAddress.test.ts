import WorkEmailAddress from "../../../../src/domain/model/WorkAccountProfile.ts/WorkEmailAddress";
import VerificationCode from "../../../../src/domain/model/WorkAccountProfile.ts/verificationCode";

describe("Unit Test for EmailAddress class", () => {
  let invalidEmail: string = " tes t@coral.com ";
  let validEmail: string = "test@coral.com";

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

  it("should remove white spaces from email address", () => {
    const emailAddress = new WorkEmailAddress(
      invalidEmail,
      active,
      validVerificationCode
    );

    expect(emailAddress.getValue()).toBe(validEmail);
  });

  it("should not return email address unless emailAddress object is activated", () => {
    const emailAddress = new WorkEmailAddress(
      validEmail,
      notActive,
      validVerificationCode
    );

    expect(() => emailAddress.getValue()).toThrow("Email is not active");

    emailAddress.activateWith(validVerificationCode.getValue());

    expect(emailAddress.getValue()).toBe(validEmail);
  });

  it("should not activate email address with expired verification code", () => {
    const emailAddress = new WorkEmailAddress(
      validEmail,
      notActive,
      expiredVerificationCode
    );

    expect(() => emailAddress.activateWith("124567")).toThrow(
      "This code is expired"
    );
  });

  it("should not activate email address with invalid verification code", () => {
    const emailAddress = new WorkEmailAddress(
      validEmail,
      notActive,
      validVerificationCode
    );

    expect(() => emailAddress.activateWith("123456")).toThrow("Invalid code");
  });

  it("should throw an error on email activation if email is already active", () => {
    const emailAddress = new WorkEmailAddress(
      validEmail,
      active,
      emptyVerificationCode
    );

    expect(() =>
      emailAddress.activateWith(validVerificationCode.getValue())
    ).toThrow("Email is already activated");
  });

  it("should throw an error if no verification code is found in email address", () => {
    const emailAddress = new WorkEmailAddress(validEmail, notActive, null);

    expect(() => emailAddress.activateWith("1234567")).toThrow(
      "No verification code found"
    );
  });

  it("should replace verification code with a new verification code", () => {
    const emailAddress = new WorkEmailAddress(
      validEmail,
      notActive,
      expiredVerificationCode
    );

    expect(() => emailAddress.activateWith("1234567")).toThrow(
      "This code is expired"
    );

    const newVerificationCode: VerificationCode = new VerificationCode(
      "7654321",
      Date.now()
    );

    emailAddress.replaceVerificationCodeWith(newVerificationCode);

    emailAddress.activateWith("7654321");

    expect(emailAddress.getValue()).toBe(validEmail);
  });
});
