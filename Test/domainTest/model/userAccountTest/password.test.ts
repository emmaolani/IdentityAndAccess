import Password from "../../../../src/domain/model/userAccount/password";

describe("Password", () => {
  it("should throw an error when password is empty", () => {
    expect(() => new Password("")).toThrow("password is empty");
  });
  //
  it("should remove white space from password", () => {
    const password = new Password("  password  ");

    expect(password.getValue()).toEqual("password");
  });

  it("should correctly compare password", () => {
    const password = new Password("password");

    expect(password.compare("password")).toBe(true);
    expect(password.compare("password1")).toBe(false);
  });
});
