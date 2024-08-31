import FullName from "../../../../src/domain/model/organization/WorkAccountProfile.ts/fullName";
import { fullNameError } from "../../../../src/domain/enum/errors/errorMsg";

describe("Unit Test fullName class", () => {
  it("should throw error if firstName is not provided", () => {
    expect(() => new FullName(" ")).toThrow(fullNameError.emptyFullName);
    expect(() => new FullName("")).toThrow(fullNameError.emptyFullName);
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
