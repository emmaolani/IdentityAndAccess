import UserName from "../../../../src/domain/model/userAccount/userName";
import { userAccountErrorMsg } from "../../../../src/domain/model/userAccount/userAccountErrorMsg";

describe("UserName", () => {
  it("should remove white space", () => {
    const userName = new UserName("  user  name  ");

    expect(userName.getValue()).toBe("username");
  });

  it("should not set username value with value that does not meet username requirements", () => {
    expect(() => new UserName("")).toThrow(
      userAccountErrorMsg.userNameNotMeetingRequirements
    );
    expect(() => new UserName(" ")).toThrow(
      userAccountErrorMsg.userNameNotMeetingRequirements
    );
    expect(() => new UserName("user+")).toThrow(
      userAccountErrorMsg.userNameNotMeetingRequirements
    );
  });

  it("should correctly compare username", () => {
    const userName = new UserName("username");

    expect(userName.isEqualTo("username")).toBe(true);
    expect(userName.isEqualTo("username1")).toBe(false);
  });
});
