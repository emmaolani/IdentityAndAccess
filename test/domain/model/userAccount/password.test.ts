import Password from "../../../../src/domain/model/userAccount/password";
import { userAccountErrorMsg } from "../../../../src/domain/model/userAccount/userAccountErrorMsg";

describe("Password", () => {
  it("should throw an error when password doesn't meet minimum requirement", () => {
    expect(() => new Password("password")).toThrow(
      userAccountErrorMsg.passwordNotMeetingRequirements
    );
    expect(() => new Password("pass word")).toThrow(
      userAccountErrorMsg.passwordNotMeetingRequirements
    );
    expect(() => new Password("")).toThrow(
      userAccountErrorMsg.passwordNotMeetingRequirements
    );
    expect(() => new Password("  ")).toThrow(
      userAccountErrorMsg.passwordNotMeetingRequirements
    );

    expect(() => new Password("SecureP@ss123")).not.toThrow(
      userAccountErrorMsg.passwordNotMeetingRequirements
    );
  });

  it("should correctly compare password", () => {
    const password = new Password("SecureP@ss123");

    expect(password.isEqualTo("SecureP@ss123")).toBe(true);
    expect(password.isEqualTo("SecureP@ss1233")).toBe(false);
  });
});
