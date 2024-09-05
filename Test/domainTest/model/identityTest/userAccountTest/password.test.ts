import Password from "../../../../../src/domain/model/identity/userAccount/password";
import { passwordError } from "../../../../../src/domain/enum/errorMsg/userAccountErrorMsg";

describe("Password", () => {
  it("should throw an error when password doesn't meet minimum requirement", () => {
    expect(() => new Password("password")).toThrow(
      passwordError.passwordNotMeetingRequirements
    );
    expect(() => new Password("")).toThrow(
      passwordError.passwordNotMeetingRequirements
    );
    expect(() => new Password(" ")).toThrow(
      passwordError.passwordNotMeetingRequirements
    );
  });

  it("should remove white space from password", () => {
    const password = new Password("  SecureP@ss123  ");

    expect(password.getValue()).toEqual("SecureP@ss123");
  });

  it("should correctly compare password", () => {
    const password = new Password("SecureP@ss123");

    expect(password.isEqualTo("SecureP@ss123")).toBe(true);
    expect(password.isEqualTo("SecureP@ss1233")).toBe(false);
  });
});
