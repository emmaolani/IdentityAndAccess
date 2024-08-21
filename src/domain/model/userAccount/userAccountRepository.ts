import UserAccount from "./userAccount";

interface UserAccountRepository {
  doesUserAccountExist(username: string): boolean;
}

export default UserAccountRepository;
