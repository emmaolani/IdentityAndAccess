import VerificationCode from "../../../../src/domain/model/contactDetails/verificationCode";

// TODO: compare code instead of returning it
describe("Unit test for verificationCode class", () => {
  it("should throw an error if code is not a 7 digit integer", () => {
    expect(() => new VerificationCode("string", Date.now())).toThrow(
      "invalid code"
    );

    expect(() => new VerificationCode("543.666", Date.now())).toThrow(
      "invalid code"
    );
  });

  it("should throw an error if code is not exactly 7 digits", () => {
    expect(() => new VerificationCode("123456", Date.now())).toThrow(
      "invalid code"
    );

    expect(() => new VerificationCode("12345678", Date.now())).toThrow(
      "invalid code"
    );
  });

  it("should throw error if timestamp is greater than current timestamp or lesser than 0", () => {
    expect(() => new VerificationCode("1234567", Date.now() + 5000000)).toThrow(
      "TimeStamp is invalid"
    );

    expect(() => new VerificationCode("1234567", -1)).toThrow(
      "TimeStamp is invalid"
    );
  });

  it("should only retrieve code that has not expired", () => {
    const validVerificationCode = new VerificationCode("1234567", Date.now());
    const expiredVerificationCode = new VerificationCode(
      "1234567",
      Date.now() - 5000000
    );

    expect(validVerificationCode.getValue()).toBe("1234567");

    expect(() => expiredVerificationCode.getValue()).toThrow(
      "This code is expired"
    );
  });
});
