import UserAccountProfileRepository from "../../../src/domain/model/identity/userAccount/userAccountProfile/userAccountProfileRepository";
import UserAccountProfile from "../../../src/domain/model/identity/userAccount/userAccountProfile/userAccountProfile";

class UserAccountProfileRepositoryMock implements UserAccountProfileRepository {
  private userAccountProfileMap: Map<string, UserAccountProfile> = new Map();
  private userAccountHasProfile: boolean;

  constructor(doesUserAccountHaveProfile: boolean) {
    this.userAccountHasProfile = doesUserAccountHaveProfile;
  }

  async doesUserAccountProfileWithUserAccountIdExist(
    userAccountId: string
  ): Promise<boolean> {
    return this.userAccountHasProfile;
  }

  setShouldUserAccountProfileWithUserAccountIdExist(anOption: boolean): void {
    this.userAccountHasProfile = anOption;
  }

  async save(userAccountProfile: UserAccountProfile): Promise<void> {
    this.userAccountProfileMap.set(
      userAccountProfile.getId(),
      userAccountProfile
    );
  }

  getProfile(userAccountProfileId: string): UserAccountProfile {
    const userAccountProfile =
      this.userAccountProfileMap.get(userAccountProfileId);

    if (userAccountProfile !== undefined) {
      return userAccountProfile;
    }
    throw new Error("User account profile not found");
  }

  async commit(): Promise<void> {
    // Do nothing
  }
}

export default UserAccountProfileRepositoryMock;
