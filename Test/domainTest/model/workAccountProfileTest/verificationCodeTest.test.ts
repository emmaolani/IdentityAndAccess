import VerificationCode from "../../../../src/domain/model/access/WorkAccountProfile.ts/verificationCode";

describe("Unit test for verificationCode class", () => {
  const validCode = "1234567";
  const stringCode = "string";
  const floatNumberCode = "543.666";
  const sixDigitCode = "123456";
  const eightDigitCode = "12345678";

  const timeStamp = Date.now();
  const largeTimeStamp = Date.now() + 5000000;
  const negativeTimeStamp = -1;
  const expiredTimeStamp = Date.now() - 5000000;

  it("should throw an error if code is not an integer", () => {
    expect(() => new VerificationCode(stringCode, timeStamp)).toThrow(
      "invalid code"
    );

    expect(() => new VerificationCode(floatNumberCode, timeStamp)).toThrow(
      "invalid code"
    );
  });

  it("should throw an error if code is not exactly 7 digits", () => {
    expect(() => new VerificationCode(sixDigitCode, timeStamp)).toThrow(
      "invalid code length"
    );

    expect(() => new VerificationCode(eightDigitCode, timeStamp)).toThrow(
      "invalid code length"
    );
  });

  it("should throw error if timestamp is greater than current timestamp or lesser than 0", () => {
    expect(() => new VerificationCode(validCode, largeTimeStamp)).toThrow(
      "TimeStamp is invalid"
    );

    expect(() => new VerificationCode(validCode, negativeTimeStamp)).toThrow(
      "TimeStamp is invalid"
    );
  });

  it("should only retrieve code that has not expired", () => {
    const validVerificationCode = new VerificationCode(validCode, timeStamp);
    const expiredVerificationCode = new VerificationCode(
      validCode,
      expiredTimeStamp
    );

    expect(validVerificationCode.getValue()).toBe(validCode);

    expect(() => expiredVerificationCode.getValue()).toThrow(
      "This code is expired"
    );
  });
});
