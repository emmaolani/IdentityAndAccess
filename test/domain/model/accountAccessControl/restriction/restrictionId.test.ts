import RestrictionId from "../../../../../src/domain/model/accountAccessControl/restriction/restrictionId";
import { restrictionErrorMsg } from "../../../../../src/domain/model/accountAccessControl/restriction/restrictionErrorMsg";
import UUIDGenerator from "../../../../../src/port/util/uUIDGenerator";

describe("AuthenticationId", () => {
  let restrictionId: RestrictionId;

  it("should create a authenticationMethodId only if the argument is of UUID v4 format", () => {
    const id = new UUIDGenerator().generate();

    restrictionId = new RestrictionId(id);

    assertThat_RestrictionId_propertiesIsEqualTo(id);
  });

  function assertThat_RestrictionId_propertiesIsEqualTo(anId: string) {
    expect(restrictionId).toBeInstanceOf(RestrictionId);
    expect(restrictionId["id"]).toBe(anId);
  }

  it("should throw an error if the argument is not UUID v4 format", () => {
    expect(() => {
      new RestrictionId("not a UUID");
    }).toThrow(restrictionErrorMsg.invalidUUID);
  });
});
