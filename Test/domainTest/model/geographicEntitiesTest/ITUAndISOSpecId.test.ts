import ITUAndISOSpecId from "../../../../src/domain/model/geographicEntities/ITUAndISOSpecId";
import UUIDGenerator from "../../../../src/port/adapters/controller/uUIDGenerator";
import { ITUAndISOSpecIdIdError } from "../../../../src/domain/enum/errors/errorMsg";

describe("ITUAndISOSpecId", () => {
  it("should create a ITUAndISOSpecId only if the argument is of UUID v4 format", () => {
    const iTUAndISOSpecId = new ITUAndISOSpecId(new UUIDGenerator().generate());

    expect(iTUAndISOSpecId).toBeInstanceOf(ITUAndISOSpecId);
  });

  it("should throw an error if the argument is not UUID v4 format", () => {
    expect(() => {
      new ITUAndISOSpecId("not a UUID");
    }).toThrow(ITUAndISOSpecIdIdError.invalidUUID);
  });
});
