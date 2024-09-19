import AssertionConcern from "../../../src/domain/assertionConcern";

describe("assertionConcern", () => {
  it("should should not throw an error", () => {
    const assertionConcern = new AssertionConcern();

    expect(() =>
      assertionConcern["assertContainsPatterns"](
        "Secure@Pass1",
        ["[{uLetter}]", "{lLetter}", "[{number}]", "[@$!%*?&.,]"], // this is the pattern required for password
        "error in assertion"
      )
    ).not.toThrow();
  });
});
