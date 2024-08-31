import VerificationCode from "../../../../src/domain/model/contactDetails/verificationCode";
import { verificationCodeError } from "../../../../src/domain/enum/errors/errorMsg";

describe("Unit test for verificationCode class", () => {
  it("should throw error if verificationCode is initialized with codes that does not meet specification", () => {
    expect(() => new VerificationCode("string", Date.now())).toThrow(
      verificationCodeError.invalidCode
    );
    expect(() => new VerificationCode("543.666", Date.now())).toThrow(
      verificationCodeError.invalidCode
    );
    expect(() => new VerificationCode("123456", Date.now())).toThrow(
      verificationCodeError.invalidCode
    );
    expect(() => new VerificationCode("12345678", Date.now())).toThrow(
      verificationCodeError.invalidCode
    );
  });

  it("should throw error if verificationCode is initialized with a timestamp that is greater than current timestamp or lesser than 0", () => {
    expect(() => new VerificationCode("1234567", Date.now() + 5000000)).toThrow(
      verificationCodeError.invalidTimeStamp
    );

    expect(() => new VerificationCode("1234567", -1)).toThrow(
      verificationCodeError.invalidTimeStamp
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
    ).toThrow(verificationCodeError.invalidCode); // invalid code entered
    expect(() =>
      expiredVerificationCode.throwErrorIfCodeIsInvalid("1234567")
    ).toThrow(verificationCodeError.expiredCode); // verification code expired
  });
});
