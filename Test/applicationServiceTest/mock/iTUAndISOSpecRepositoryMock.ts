import ITUAndISOSpecRepository from "../../../src/domain/model/geographicEntities/ITUAndISOSpecRepository";
import ITUAndISOSpec from "../../../src/domain/model/geographicEntities/ITUAndISOSpec";
import ITUAndISOSpecId from "../../../src/domain/model/geographicEntities/ITUAndISOSpecId";
import UUIDGenerator from "../../../src/port/adapters/controller/uUIDGenerator";
import { ITUAndISOSpecRepoErrorMsg } from "../../../src/port/_enums/errorMsg/repositories/repositoryErrorMsg/iTuAndISOSpecRepoErrorMsg";
import FakeDb from "./fakeDb";

class ITUAndISOSpecRepositoryMock implements ITUAndISOSpecRepository {
  private DB: FakeDb;

  constructor(aDB: FakeDb) {
    this.DB = aDB;
  }

  async save(aITUAndISOSpec: ITUAndISOSpec): Promise<void> {
    this.DB.save(aITUAndISOSpec.getId(), aITUAndISOSpec);
  }

  async getSpecByCountryCode(aCountryCode: string): Promise<ITUAndISOSpec> {
    const ituAndISOSpec = this.ituAndISOSpecMap.get(aCountryCode);

    if (ituAndISOSpec !== undefined) {
      return ituAndISOSpec;
    }
    throw new Error(ITUAndISOSpecRepoErrorMsg.ITUAndISOSpecNotFound);
  }
}

export default ITUAndISOSpecRepositoryMock;
