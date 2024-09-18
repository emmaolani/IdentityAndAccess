import UserAccountProfileRepository from "../../../src/domain/model/userAccount/userAccountProfile/userAccountProfileRepository";
import UserAccountProfile from "../../../src/domain/model/userAccount/userAccountProfile/userAccountProfile";
import FakeDb from "./fakeDb/fakeDb";
import userAccountProfileRepoError from "../../../src/port/adapters/persistance/repositoryErrorMsg/userAccountProfileRepoErrorMsg";

class UserAccountProfileRepositoryMock implements UserAccountProfileRepository {
  private db: FakeDb;

  constructor(aDb: FakeDb) {
    this.db = aDb;
  }

  async throwErrorIfUserAccountAlreadyHasProfile(anId: string): Promise<void> {
    const userAccountProfile = this.db.find(UserAccountProfile, anId);

    if (!(userAccountProfile instanceof UserAccountProfile)) return;

    throw new Error(userAccountProfileRepoError.userAccountProfileAlreadyExist);
  }

  async save(aUserAccountProfile: UserAccountProfile): Promise<void> {
    this.db.save(aUserAccountProfile);
  }

  async remove(anId: string): Promise<void> {
    this.db.remove(UserAccountProfile, anId);
  }

  async getById(anId: string): Promise<UserAccountProfile> {
    const userAccountProfile = this.db.find(UserAccountProfile, anId);

    if (userAccountProfile instanceof UserAccountProfile) {
      return userAccountProfile;
    }

    throw new Error("User account profile not found");
  }

  async commit(): Promise<void> {
    // Do nothing
  }
}

export default UserAccountProfileRepositoryMock;
