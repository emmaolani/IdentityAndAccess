import Password from "../../../../../src/domain/model/identity/userAccount/password";

describe("Password", () => {
  it("should throw an error when password doesn't meet minimum requirement", () => {
    expect(() => new Password("password")).toThrow(
      "password does not meet security requirements"
    );
  });

  it("should remove white space from password", () => {
    const password = new Password("  SecureP@ss123  ");

    expect(password.getValue()).toEqual("SecureP@ss123");
  });

  it("should correctly compare password", () => {
    const password = new Password("SecureP@ss123");

    expect(password.compareTo("SecureP@ss123")).toBe(true);
    expect(password.compareTo("SecureP@ss1233")).toBe(false);
  });
});
