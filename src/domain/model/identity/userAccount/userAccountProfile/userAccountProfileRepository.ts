import UserAccountProfile from "./userAccountProfile";

interface UserAccountProfileRepository {
  getProfileById(userAccountProfileId: string): Promise<UserAccountProfile>;
  doesUserAccountProfileWithUserAccountIdExist(
    userAccountId: string
  ): Promise<boolean>;
  save(userAccountProfile: UserAccountProfile): Promise<void>;
  commit(): Promise<void>;
}

export default UserAccountProfileRepository;
