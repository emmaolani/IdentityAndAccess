import RestrictionRepository from "../../../src/domain/model/accountAccessControl/restriction/restrictionRepository";
import Restriction from "../../../src/domain/model/accountAccessControl/restriction/restriction";
import restrictionErrorMsg from "../../../src/port/adapters/persistance/repositoryErrorMsg/restrictionErrorMsg";
import FakeDb from "./fakeDb/fakeDb";

class RestrictionRepositoryMock implements RestrictionRepository {
  private db: FakeDb;

  constructor(aDb: FakeDb) {
    this.db = aDb;
  }

  async save(aRestriction: Restriction): Promise<void> {
    this.db.save(aRestriction);
  }

  async getByReason(aReason: string): Promise<Restriction> {
    const data = this.db.find(Restriction, aReason);

    if (data instanceof Restriction) {
      return data;
    }

    throw Error(restrictionErrorMsg.notFound);
  }

  async remove(anId: string): Promise<void> {
    this.db.remove(Restriction, anId);
  }
}

export default RestrictionRepositoryMock;
