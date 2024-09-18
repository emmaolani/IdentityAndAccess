import UserAccountId from "../../../../src/domain/model/userAccount/userAccountId";
import UUIDGenerator from "../../../../src/port/util/uUIDGenerator";
import { userAccountErrorMsg } from "../../../../src/domain/model/userAccount/userAccountErrorMsg";

describe("UserAccountId", () => {
  it("should create a userAccountId only if the argument is of UUID v4 format", () => {
    const userAccountId = new UserAccountId(new UUIDGenerator().generate());

    expect(userAccountId).toBeInstanceOf(UserAccountId);
  });

  it("should throw an error if the argument is not UUID v4 format", () => {
    expect(() => {
      new UserAccountId("not a UUID");
    }).toThrow(userAccountErrorMsg.invalidUUID);
  });
});
