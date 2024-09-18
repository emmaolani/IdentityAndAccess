import ITUAndISOSpecId from "../../../../src/domain/model/geographicEntities/ITUAndISOSpecId";
import UUIDGenerator from "../../../../src/port/util/uUIDGenerator";
import { ITUAndISOSpecIdErrorMsg } from "../../../../src/domain/model/geographicEntities/iTUAndISOErrorMsg";

describe("ITUAndISOSpecId", () => {
  it("should create a ITUAndISOSpecId only if the argument is of UUID v4 format", () => {
    const iTUAndISOSpecId = new ITUAndISOSpecId(new UUIDGenerator().generate());

    expect(iTUAndISOSpecId).toBeInstanceOf(ITUAndISOSpecId);
  });

  it("should throw an error if the argument is not UUID v4 format", () => {
    expect(() => {
      new ITUAndISOSpecId("not a UUID");
    }).toThrow(ITUAndISOSpecIdErrorMsg.invalidUUID);
  });
});
