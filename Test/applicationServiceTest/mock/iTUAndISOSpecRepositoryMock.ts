import ITUAndISOSpecRepository from "../../../src/domain/model/geographicEntities/ITUAndISOSpecRepository";
import ITUAndISOSpec from "../../../src/domain/model/geographicEntities/ITUAndISOSpec";
import { ITUAndISOSpecRepoErrorMsg } from "../../../src/port/_enums/errorMsg/repositories/repositoryErrorMsg/iTuAndISOSpecRepoErrorMsg";
import FakeDb from "./fakeDb/fakeDb";

class ITUAndISOSpecRepositoryMock implements ITUAndISOSpecRepository {
  private db: FakeDb;

  constructor(aDB: FakeDb) {
    this.db = aDB;
  }

  async save(aITUAndISOSpec: ITUAndISOSpec): Promise<void> {
    this.db.save(aITUAndISOSpec);
  }

  async remove(id: string): Promise<void> {
    this.db.remove(ITUAndISOSpec, id);
  }

  async getSpecByCountryCode(aCountryCode: string): Promise<ITUAndISOSpec> {
    const ituAndISOSpec = this.db.find(ITUAndISOSpec, aCountryCode);

    if (ituAndISOSpec !== undefined) {
      if (ituAndISOSpec instanceof ITUAndISOSpec) {
        return ituAndISOSpec;
      }
    }
    throw new Error(ITUAndISOSpecRepoErrorMsg.ITUAndISOSpecNotFound);
  }
}

export default ITUAndISOSpecRepositoryMock;
