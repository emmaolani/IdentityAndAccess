import UserAccount from "../../../../src/domain/model/userAccount/userAccount";
import UserName from "../../../../src/domain/model/userAccount/userName";
import Password from "../../../../src/domain/model/userAccount/password";

describe("UserAccount", () => {
  it("should create a user account", () => {
    const userAccount = new UserAccount(
      "id",
      "pId",
      new UserName("username"),
      new Password("password"),
      true
    );

    expect(userAccount).toBeInstanceOf(UserAccount);
  });

  it("should return true if a user's username and password is valid", () => {
    const userAccount = new UserAccount(
      "id",
      "pId",
      new UserName("username"),
      new Password("password"),
      true
    );

    expect(userAccount.validate("username", "password")).toBe(true);
    expect(userAccount.validate("username", "password1")).toBe(false);
  });

  it("should return false if active status is false", () => {
    const userAccount = new UserAccount(
      "id",
      "pId",
      new UserName("username"),
      new Password("password"),
      false
    );

    expect(userAccount.validate("username", "password")).toBe(false);
  });
});
