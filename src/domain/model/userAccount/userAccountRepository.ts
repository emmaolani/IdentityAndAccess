import UserAccount from "./userAccount";

interface UserAccountRepository {
  doesUserAccountExist(username: string): boolean;
  save(userAccount: UserAccount): void;
  commit(): void;
}

export default UserAccountRepository;
