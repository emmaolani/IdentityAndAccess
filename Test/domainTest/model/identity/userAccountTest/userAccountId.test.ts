import UserAccountId from "../../../../../src/domain/model/identity/userAccount/userAccountId";
import UUIDGenerator from "../../../../../src/port/adapters/controller/uUIDGenerator";

describe("UserAccountId", () => {
  it("should create a userAccountId only if the argument is of UUID v4 format", () => {
    const userAccountId = new UserAccountId(new UUIDGenerator().generate());

    expect(userAccountId).toBeInstanceOf(UserAccountId);
  });

  it("should throw an error if the argument is not UUID v4 format", () => {
    expect(() => {
      new UserAccountId("not a UUID");
    }).toThrow("Invalid UUID");
  });
});
