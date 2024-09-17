import { reasonError } from "../../../../../src/domain/enum/errorMsg/restrictionErrorMsg";
import Reason from "../../../../../src/domain/model/accountAccessControl/restriction/reason";

describe("Reason", () => {
  let reason: Reason;

  it("should correctly create an instance of Reason", () => {
    reason = new Reason("awaiting profile creation");

    assertThat_type_propertiesMatch("awaiting profile creation");
  });

  function assertThat_type_propertiesMatch(aReasonName: string) {
    expect(reason).toBeInstanceOf(Reason);
    expect(reason["reason"]).toBe(aReasonName);
  }

  it("should throw an error if the reason is an empty string", () => {
    expect(() => {
      new Reason("");
    }).toThrow(reasonError.invalidReason);

    expect(() => {
      new Reason("     ");
    }).toThrow(reasonError.invalidReason);
  });
});
