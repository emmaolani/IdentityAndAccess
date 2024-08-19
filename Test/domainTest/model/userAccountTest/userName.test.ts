import UserName from "../../../../src/domain/model/userAccount/userName";

describe("UserName", () => {
  it("should remove white space", () => {
    const userName = new UserName("  user  name  ");

    expect(userName.getValue()).toBe("username");
  });

  it("should not store empty value as a username", () => {
    expect(() => new UserName("")).toThrow("Username is empty");
    expect(() => new UserName(" ")).toThrow("Username is empty");
  });

  it("should correctly compare username", () => {
    const userName = new UserName("username");

    expect(userName.compare("username")).toBe(true);
    expect(userName.compare("username1")).toBe(false);
  });
});
