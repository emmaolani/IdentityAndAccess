import UserName from "../../../../../src/domain/model/identity/userAccount/userName";

describe("UserName", () => {
  it("should remove white space", () => {
    const userName = new UserName("  user  name  ");

    expect(userName.getValue()).toBe("username");
  });

  it("should not set username value with value that does not meet username requirements", () => {
    expect(() => new UserName("")).toThrow(
      "Username does not meet requirements"
    );
    expect(() => new UserName(" ")).toThrow(
      "Username does not meet requirements"
    );
    expect(() => new UserName("user+")).toThrow(
      "Username does not meet requirements"
    );
  });

  it("should correctly compare username", () => {
    const userName = new UserName("username");

    expect(userName.compareTo("username")).toBe(true);
    expect(userName.compareTo("username1")).toBe(false);
  });
});
