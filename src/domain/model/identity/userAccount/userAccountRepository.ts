import UserAccount from "./userAccount";

interface UserAccountRepository {
  doesUserAccountWithUsernameExist(username: string): Promise<boolean>;
  save(userAccount: UserAccount): Promise<void>;
  getById(id: string): Promise<UserAccount>;
  remove(id: string): Promise<void>;
  lockUserAccount(UserAccountId: string): Promise<void>;
  commit(): Promise<void>;
}

export default UserAccountRepository;
