import UserAccount from "./userAccount";

interface UserAccountRepository {
  doesUserAccountExist(username: string): Promise<boolean>;
  save(userAccount: UserAccount): Promise<void>;
  lockUserAccount(UserAccountId: string): Promise<void>;
  commit(): Promise<void>;
}

export default UserAccountRepository;
