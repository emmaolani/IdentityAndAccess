import UserAccountProfile from "./userAccountProfile";

interface UserAccountProfileRepository {
  getById(userAccountProfileId: string): Promise<UserAccountProfile>;
  doesUserAccountProfileWithUserAccountIdExist(
    userAccountId: string
  ): Promise<boolean>;
  save(userAccountProfile: UserAccountProfile): Promise<void>;
  remove(id: string): Promise<void>;
  commit(): Promise<void>;
}

export default UserAccountProfileRepository;
