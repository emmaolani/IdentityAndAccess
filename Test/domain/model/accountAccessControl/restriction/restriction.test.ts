import Restriction from "../../../../../src/domain/model/accountAccessControl/restriction/restriction";
import RestrictionId from "../../../../../src/domain/model/accountAccessControl/restriction/restrictionId";
import Reason from "../../../../../src/domain/model/accountAccessControl/restriction/reason";
import UUIDGenerator from "../../../../../src/port/util/uUIDGenerator";

describe("Restriction", () => {
  let restriction: Restriction;

  it("should correctly create an instance of Restriction", () => {
    const id = new UUIDGenerator().generate();
    const reasonName = "awaiting profile creation";
    restriction = new Restriction(
      new RestrictionId(id),
      new Reason(reasonName)
    );

    assertThat_Reason_propertiesMatches(id, reasonName);
  });

  function assertThat_Reason_propertiesMatches(id: string, reasonName: string) {
    expect(restriction).toBeInstanceOf(Restriction);
    expect(restriction["id"]["id"]).toBe(id);
    expect(restriction["reason"]["reason"]).toBe(reasonName);
  }

  it("should return Id", () => {
    restriction = new Restriction(
      new RestrictionId(new UUIDGenerator().generate()),
      new Reason("awaiting profile creation")
    );

    expect(restriction.getId()).toBeInstanceOf(RestrictionId);
  });
});
