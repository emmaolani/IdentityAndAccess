import Restriction from "../../../../../src/domain/model/accountAccessControl/restriction/restriction";
import { restrictionErrorMsg } from "../../../../../src/domain/model/accountAccessControl/restriction/restrictionErrorMsg";
import RestrictionId from "../../../../../src/domain/model/accountAccessControl/restriction/restrictionId";
import UUIDGenerator from "../../../../../src/port/util/uUIDGenerator";

describe("Restriction", () => {
  let restriction: Restriction;

  it("should correctly create an instance of Restriction", () => {
    const id = new UUIDGenerator().generate();
    const reasonName = "awaiting profile creation";
    restriction = new Restriction(new RestrictionId(id), reasonName);

    assertThat_Reason_propertiesMatches(id, reasonName);
  });

  function assertThat_Reason_propertiesMatches(id: string, reasonName: string) {
    expect(restriction).toBeInstanceOf(Restriction);
    expect(restriction["id"]["id"]).toBe(id);
    expect(restriction["reason"]).toBe(reasonName);
  }

  it("should throw error if reason is empty string", () => {
    expect(() => {
      new Restriction(new RestrictionId(new UUIDGenerator().generate()), "");
    }).toThrow(restrictionErrorMsg.invalidReason);
    expect(() => {
      new Restriction(new RestrictionId(new UUIDGenerator().generate()), "  ");
    }).toThrow(restrictionErrorMsg.invalidReason);
  });

  it("should return Id", () => {
    restriction = new Restriction(
      new RestrictionId(new UUIDGenerator().generate()),
      "awaiting profile creation"
    );

    expect(restriction.getId()).toBeInstanceOf(RestrictionId);
  });
});
