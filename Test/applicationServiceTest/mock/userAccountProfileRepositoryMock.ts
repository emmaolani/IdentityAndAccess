import UserAccountProfileRepository from "../../../src/domain/model/identity/userAccount/userAccountProfile/userAccountProfileRepository";
import UserAccountProfile from "../../../src/domain/model/identity/userAccount/userAccountProfile/userAccountProfile";
import FakeDb from "./fakeDb/fakeDb";

class UserAccountProfileRepositoryMock implements UserAccountProfileRepository {
  private db: FakeDb;

  constructor(db: FakeDb) {
    this.db = db;
  }

  async doesUserAccountProfileWithUserAccountIdExist(
    userAccountId: string
  ): Promise<boolean> {
    if (this.db.find(UserAccountProfile, userAccountId) !== undefined)
      return true;
    else return false;
  }

  async save(aUserAccountProfile: UserAccountProfile): Promise<void> {
    this.db.save(aUserAccountProfile);
  }

  async remove(id: string): Promise<void> {
    this.db.remove(UserAccountProfile, id);
  }

  async getProfileById(
    userAccountProfileId: string
  ): Promise<UserAccountProfile> {
    const userAccountProfile = this.db.find(
      UserAccountProfile,
      userAccountProfileId
    );
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
