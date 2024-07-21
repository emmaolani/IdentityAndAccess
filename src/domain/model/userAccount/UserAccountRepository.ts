import UserAccount from "./userAccount";
interface UserAccountRepository {
    getUserAccount(userAccountID: string): UserAccount
}

export default UserAccountRepository