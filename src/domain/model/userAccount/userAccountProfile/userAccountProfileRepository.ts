import UserAccountProfile from "./userAccountProfile";

interface UserAccountProfileRepository {
  getById(userAccountProfileId: string): Promise<UserAccountProfile>;
  throwErrorIfUserAccountAlreadyHasProfile(
    userAccountId: string
  ): Promise<void>;
  save(userAccountProfile: UserAccountProfile): Promise<void>;
  remove(id: string): Promise<void>;
  commit(): Promise<void>;
}

export default UserAccountProfileRepository;
