import UserAccountProfileRepository from "../../../src/domain/model/identity/userAccount/userAccountProfile/userAccountProfileRepository";
import UserAccountProfile from "../../../src/domain/model/identity/userAccount/userAccountProfile/userAccountProfile";
import FakeDb from "./fakeDb";

class UserAccountProfileRepositoryMock implements UserAccountProfileRepository {
  private DB: FakeDb;

  constructor(db: FakeDb) {
    this.DB = db;
  }

  async doesUserAccountProfileWithUserAccountIdExist(
    userAccountId: string
  ): Promise<boolean> {
    return this.DB.checkIfKeyExists(userAccountId);
  }

  async save(userAccountProfile: UserAccountProfile): Promise<void> {
    this.DB.save(userAccountProfile.getId(), userAccountProfile);
  }

  async getProfileById(
    userAccountProfileId: string
  ): Promise<UserAccountProfile> {
    if (this.DB.checkIfKeyExists(userAccountProfileId)) {
      return this.DB.getById(userAccountProfileId);
    }
    throw new Error("User account profile not found");
  }

  async commit(): Promise<void> {
    // Do nothing
  }
}

export default UserAccountProfileRepositoryMock;
