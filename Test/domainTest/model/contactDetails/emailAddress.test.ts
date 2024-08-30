import EmailAddress from "../../../../src/domain/model/contactDetails/emailAddress";
import VerificationCode from "../../../../src/domain/model/contactDetails/verificationCode";

describe("Unit Test for EmailAddress class", () => {
  let invalidEmail: string = " tes t@coral.com ";
  let validEmail: string = "test@coral.com";

  let active: boolean = true;
  let notActive: boolean = false;

  it("should remove white spaces from email address", () => {
    const emailAddress = new EmailAddress(
      invalidEmail,
      active,
      createVerificationCode("1234567", Date.now())
    );

    expect(emailAddress.getValue()).toBe(validEmail);
  });

  it("should not return email address unless emailAddress object is activated", () => {
    const verificationCode = createVerificationCode("1234567", Date.now());

    const emailAddress = new EmailAddress(
      validEmail,
      notActive,
      verificationCode
    );

    expect(() => emailAddress.getValue()).toThrow("Email is not active");

    emailAddress.activateWith(verificationCode.getValue());

    expect(emailAddress.getValue()).toBe(validEmail);
  });

  it("should not activate email address with expired verification code", () => {
    const verificationCode = createVerificationCode(
      "1234567",
      Date.now() - 500000
    );
    const emailAddress = new EmailAddress(
      validEmail,
      notActive,
      verificationCode
    );

    expect(() =>
      emailAddress.activateWith(verificationCode.getValue())
    ).toThrow("This code is expired");
  });

  it("should not activate email address with invalid verification code", () => {
    const emailAddress = new EmailAddress(
      validEmail,
      notActive,
      createVerificationCode("1234567", Date.now())
    );

    expect(() => emailAddress.activateWith("2234567")).toThrow("Invalid code");
  });

  it("should throw an error on email activation if email is already active", () => {
    const emailAddress = new EmailAddress(validEmail, active, null);

    expect(() => emailAddress.activateWith("1234567")).toThrow(
      "Email is already activated"
    );
  });

  it("should throw an error if no verification code is found in email address", () => {
    const emailAddress = new EmailAddress(validEmail, notActive, null);

    expect(() => emailAddress.activateWith("1234567")).toThrow(
      "No verification code found"
    );
  });

  it("should replace verification code with a new verification code", () => {
    const emailAddress = new EmailAddress(
      validEmail,
      notActive,
      createVerificationCode("1234567", Date.now() - 500000)
    );

    expect(() => emailAddress.activateWith("1234567")).toThrow(
      "This code is expired"
    );

    const newVerificationCode: VerificationCode = createVerificationCode(
      "7654321",
      Date.now()
    );

    emailAddress.replaceVerificationCodeWith(newVerificationCode);

    emailAddress.activateWith(newVerificationCode.getValue());

    expect(emailAddress.getValue()).toBe(validEmail);
  });

  function createVerificationCode(aCode: string, aTimeStamp: number) {
    return new VerificationCode(aCode, aTimeStamp);
  }
});
