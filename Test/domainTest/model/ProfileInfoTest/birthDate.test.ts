import BirthDate from "../../../../src/domain/model/PersonalInfo/birthDate";

describe("BirthDate", () => {
  it("should create a valid birth date", () => {
    const birthDate = new BirthDate("1995-10-10");
    expect(birthDate).toBeDefined();
  });

  it("should throw an error for invalid birth date", () => {
    expect(() => new BirthDate("1995-10-32")).toThrow("Invalid birth date");
  });
});
