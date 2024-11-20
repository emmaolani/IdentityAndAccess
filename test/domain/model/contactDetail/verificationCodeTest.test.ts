import VerificationCode from "../../../../src/domain/model/contactDetails/verificationCode";
import { contactDetailErrorMsg } from "../../../../src/domain/model/contactDetails/contactDetailErrorMsg";

describe("Unit test for verificationCode class", () => {
  it("should throw error if verificationCode is initialized with codes that does not meet specification", () => {
    expect(() => new VerificationCode("string", Date.now())).toThrow(
      contactDetailErrorMsg.invalidCode
    );
    expect(() => new VerificationCode("543.666", Date.now())).toThrow(
      contactDetailErrorMsg.invalidCode
    );
    expect(() => new VerificationCode("123456", Date.now())).toThrow(
      contactDetailErrorMsg.invalidCode
    );
    expect(() => new VerificationCode("12345678", Date.now())).toThrow(
      contactDetailErrorMsg.invalidCode
    );
  });

  it("should throw error if verificationCode is initialized with a timestamp that is greater than current timestamp or lesser than 0", () => {
    expect(() => new VerificationCode("1234567", Date.now() + 5000000)).toThrow(
      contactDetailErrorMsg.invalidTimeStamp
    );

    expect(() => new VerificationCode("1234567", -1)).toThrow(
      contactDetailErrorMsg.invalidTimeStamp
    );
  });

  it("should not throw Error if code is valid but throw error if code is incorrect or expired", () => {
    const validVerificationCode = new VerificationCode("1234567", Date.now());
    const expiredVerificationCode = new VerificationCode(
      "1234567",
      Date.now() - 5000000
    );

    expect(() =>
      validVerificationCode.throwErrorIfCodeIsInvalid("1234567")
    ).not.toThrow(); // valid code entered
    expect(() =>
      validVerificationCode.throwErrorIfCodeIsInvalid("123456")
    ).toThrow(contactDetailErrorMsg.invalidCode); // invalid code entered
    expect(() =>
      expiredVerificationCode.throwErrorIfCodeIsInvalid("1234567")
    ).toThrow(contactDetailErrorMsg.expiredCode); // verification code expired
  });
});
