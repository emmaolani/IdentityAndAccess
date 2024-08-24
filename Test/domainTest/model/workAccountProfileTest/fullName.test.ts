import FullName from "../../../../src/domain/model/WorkAccountProfile.ts/fullName";

describe("Unit Test fullName class", () => {
  const validFirstName = "Dr James";
  const emptyFirstName = "";
  const whiteSpaceFirstName = " Dr  James   ";

  const validLastName = "M Thomas";
  const emptyLastName = "";
  const whiteSpacedLastName = "  M  Thomas ";

  it("should throw error if firstName is not provided", () => {
    expect(() => new FullName(emptyFirstName, validLastName)).toThrow(
      "first name is empty"
    );
  });

  it("should throw error if lastName is not provided", () => {
    expect(() => new FullName(validFirstName, emptyLastName)).toThrow(
      "last name is empty"
    );
  });

  it("should correct invalid white spaces in firstName", () => {
    const fullName: FullName = new FullName(whiteSpaceFirstName, validLastName);

    expect(fullName.getFullName()).toBe(`${validFirstName} ${validLastName}`);
  });

  it("should correct invalid white spaces in lastName", () => {
    const fullName: FullName = new FullName(
      validFirstName,
      whiteSpacedLastName
    );

    expect(fullName.getFullName()).toBe(`${validFirstName} ${validLastName}`);
  });
});
