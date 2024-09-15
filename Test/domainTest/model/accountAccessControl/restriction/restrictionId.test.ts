import RestrictionId from "../../../../../src/domain/model/accountAccessControl/restriction/restrictionId";
import { restrictionIdError } from "../../../../../src/domain/enum/errorMsg/restrictionErrorMsg";
import UUIDGenerator from "../../../../../src/port/adapters/controller/uUIDGenerator";

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
    }).toThrow(restrictionIdError.invalidUUID);
  });
});
