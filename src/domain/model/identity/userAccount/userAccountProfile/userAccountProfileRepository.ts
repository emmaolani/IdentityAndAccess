import UserAccountProfile from "./userAccountProfile";

interface UserAccountProfileRepository {
  doesUserAccountProfileWithUserAccountIdExist(
    userAccountId: string
  ): Promise<boolean>;
  save(userAccountProfile: UserAccountProfile): Promise<void>;
  commit(): Promise<void>;
}

export default UserAccountProfileRepository;
