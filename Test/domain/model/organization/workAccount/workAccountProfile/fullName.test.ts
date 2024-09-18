import FullName from "../../../../../../src/domain/model/organization/workAccount/workAccountProfile/fullName";
import workAccountProfileErrorMsg from "../../../../../../src/domain/model/organization/workAccount/workAccountProfile/workAccountProfileErrorMsg";

describe("Unit Test fullName class", () => {
  it("should throw error if firstName is not provided", () => {
    expect(() => new FullName(" ")).toThrow(
      workAccountProfileErrorMsg.emptyName
    );
    expect(() => new FullName("")).toThrow(
      workAccountProfileErrorMsg.emptyName
    );
  });

  it("should store valid name", () => {
    const fullName: FullName = new FullName("  Dr    test    jones ");
    expect(fullName.getFullName()).toBe("Dr test jones");
  });

  it("should correct invalid white spaces in firstName", () => {
    const fullName: FullName = new FullName("  Dr    test    jones ");

    expect(fullName.getFullName()).toBe("Dr test jones");
  });
});
