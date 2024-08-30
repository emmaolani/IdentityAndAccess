import EmailAddress from "../../../../src/domain/model/contactDetails/emailAddress";
import VerificationCode from "../../../../src/domain/model/contactDetails/verificationCode";

describe("Unit Test for EmailAddress class", () => {
  let whiteSpacedEmail: string = " tes t@coral.com ";
  let validEmail: string = "test@coral.com";

  let active: boolean = true;
  let notActive: boolean = false;

  it("should remove white spaces from email address", () => {
    const emailAddress = new EmailAddress(
      whiteSpacedEmail,
      active,
      createVerificationCode("1234567", Date.now())
    );

    expect(emailAddress.getValue()).toBe(validEmail);
  });

  it("should throw an error if emailAddress is instantiated with an address that does not meet requirement", () => {
    expect(() => new EmailAddress("invalidEmail@Coral", active, null)).toThrow(
      "Invalid email address"
    );
    expect(() => new EmailAddress("invalidEmail.Coral", active, null)).toThrow(
      "Invalid email address"
    );
    expect(() => new EmailAddress("invalidEmailCoral", active, null)).toThrow(
      "Invalid email address"
    );
    expect(() => new EmailAddress("a".repeat(255), active, null)).toThrow(
      "Invalid email address"
    ); // email address should not exceed 254 characters
    expect(() => new EmailAddress("", active, null)).toThrow(
      "Invalid email address"
    );
    expect(() => new EmailAddress("   ", active, null)).toThrow(
      "Invalid email address"
    );
  });

  it("should return email activation status", () => {
    const verificationCode = createVerificationCode("1234567", Date.now());

    const emailAddressOne = new EmailAddress(
      validEmail,
      notActive,
      verificationCode
    );

    const emailAddressTwo = new EmailAddress(validEmail, active, null);

    expect(emailAddressOne.getActiveStatus()).toBe(notActive);
    expect(emailAddressTwo.getActiveStatus()).toBe(active);
  });

  it("should activate email address with valid verification code", () => {
    const emailAddress = new EmailAddress(
      validEmail,
      notActive,
      createVerificationCode("1234567", Date.now())
    );

    expect(() => emailAddress.activateWith("1234567")).not.toThrow();
  });

  it("should not activate email address when verification code has expired", () => {
    const verificationCode = createVerificationCode(
      "1234567",
      Date.now() - 500000
    );
    const emailAddress = new EmailAddress(
      validEmail,
      notActive,
      verificationCode
    );

    expect(() => emailAddress.activateWith("1234567")).toThrow(
      "This code is expired"
    );
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

    expect(() => emailAddress.activateWith("123456")).toThrow(
      "Email is already activated"
    ); // invalid code is used (invalid code should not be checked because email is already active)
  });

  it("should throw an error if no verification code is found in email address", () => {
    const emailAddress = new EmailAddress(validEmail, notActive, null);

    expect(() => emailAddress.activateWith("123456")).toThrow(
      "No verification code found"
    ); // invalid code is used (invalid code should not be checked because no verification code is found)
  });

  it("should replace verification code with a new verification code", () => {
    const emailAddress = new EmailAddress(
      validEmail,
      notActive,
      createVerificationCode("1234567", Date.now() - 500000) // expired code
    );

    expect(() => emailAddress.activateWith("1234567")).toThrow(
      "This code is expired"
    );

    const newVerificationCode: VerificationCode = createVerificationCode(
      "7654321",
      Date.now()
    );

    emailAddress.replaceVerificationCodeWith(newVerificationCode);

    expect(() => emailAddress.activateWith("7654321")).not.toThrow();
  });

  function createVerificationCode(aCode: string, aTimeStamp: number) {
    return new VerificationCode(aCode, aTimeStamp);
  }
});
