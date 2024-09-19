import AssertionConcern from "../../../src/domain/assertionConcern";

describe("assertionConcern", () => {
  it("should throw error if string is empty", () => {
    const assertionConcern = new AssertionConcern();

    expect(() => {
      assertionConcern["assertNotNull"]("    ", "empty string");
    }).toThrow("empty string");
    expect(() => {
      assertionConcern["assertNotNull"]("", "empty string");
    }).toThrow("empty string");

    expect(() => {
      assertionConcern["assertNotNull"]("hello", "empty string");
    }).not.toThrow();
  });

  it("should throw an error if length of value is larger or smaller than specified", () => {
    const assertionConcern = new AssertionConcern();

    expect(() =>
      assertionConcern["assertLengthIsCorrect"](
        "Secure@Pass1",
        8,
        20,
        "length size is invalid"
      )
    ).not.toThrow();
    expect(() =>
      assertionConcern["assertLengthIsCorrect"](
        "Secure", // value is lesser than 8
        8,
        20,
        "length size is invalid"
      )
    ).toThrow("length size is invalid");
  });

  it("should throw an error if there is whitespace in a string", () => {
    const assertionConcern = new AssertionConcern();

    expect(() =>
      assertionConcern["assertNoWhiteSpace"](
        "Secure@Pass1",
        "there is whitespace in this string"
      )
    ).not.toThrow();
    expect(() =>
      assertionConcern["assertNoWhiteSpace"](
        "Secure @Pass1",
        "there is whitespace in this string"
      )
    ).toThrow("there is whitespace in this string");
  });

  it("should throw an error if pattern does not match", () => {
    const assertionConcern = new AssertionConcern();
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,])[A-Za-z\d@$!%*?&.,]{8,20}$/; // this is the pattern required for password

    expect(() =>
      assertionConcern["assertMatchesRegExp"](
        "Secure@Pass1",
        passwordRegex,
        "string does not match regex"
      )
    ).not.toThrow();

    expect(() =>
      assertionConcern["assertMatchesRegExp"](
        "SecurePass", // this password does not match the pattern
        passwordRegex,
        "string does not match regex"
      )
    ).toThrow("string does not match regex");
  });
});
