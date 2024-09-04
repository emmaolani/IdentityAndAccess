import UserAccountProfile from "./userAccountProfile";

interface UserAccountProfileRepository {
  save(userAccountProfile: UserAccountProfile): Promise<void>;
  doesUserAccountProfileWithUserAccountIdExist(
    userAccountId: string
  ): Promise<boolean>;
}

export default UserAccountProfileRepository;
