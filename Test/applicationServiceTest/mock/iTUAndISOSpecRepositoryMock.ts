import ITUAndISOSpecRepository from "../../../src/domain/model/geographicEntities/ITUAndISOSpecRepository";
import ITUAndISOSpec from "../../../src/domain/model/geographicEntities/ITUAndISOSpec";
import ITUAndISOSpecId from "../../../src/domain/model/geographicEntities/ITUAndISOSpecId";
import UUIDGenerator from "../../../src/port/adapters/controller/uUIDGenerator";
import ITUAndISOSpecErrorMsg from "../../../src/port/_enums/error/errorMsg";

class ITUAndISOSpecRepositoryMock implements ITUAndISOSpecRepository {
  private ituAndISOSpecMap: Map<string, ITUAndISOSpec> = new Map();

  constructor(initializeWithITUAndISOSpec: boolean) {
    if (initializeWithITUAndISOSpec) {
      this.ituAndISOSpecMap.set(
        "NG",
        new ITUAndISOSpec(
          new ITUAndISOSpecId(new UUIDGenerator().generate()),
          "countryId",
          "NG",
          "+234"
        )
      );
    }
  }

  async getSpecByCountryCode(aCountryCode: string): Promise<ITUAndISOSpec> {
    const ituAndISOSpec = this.ituAndISOSpecMap.get(aCountryCode);

    if (ituAndISOSpec !== undefined) {
      return ituAndISOSpec;
    }
    throw new Error(ITUAndISOSpecErrorMsg.ITUAndISOSpecNotFound);
  }
}

export default ITUAndISOSpecRepositoryMock;
