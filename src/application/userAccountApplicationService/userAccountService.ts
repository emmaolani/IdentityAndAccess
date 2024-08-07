import UserAccount from "../../domain/model/userAccount/userAccount";
import UserAccountRepository from "../../domain/model/userAccount/UserAccountRepository";
import UserAccountFactory from "../../domain/model/userAccount/userAccountFactory";
import UserAccountCreationForm from "../../domain/model/userAccount/userAccountForm";

class UserAccountApplicationService {
    private userAccountRepository: UserAccountRepository;
    private userAccountFactory: UserAccountFactory;
    constructor(aUserAccountRepository: UserAccountRepository, aUserAccountFactory: UserAccountFactory){
        this.userAccountRepository = aUserAccountRepository;
        this.userAccountFactory = aUserAccountFactory;
    }
    createUserAccount(aUserAccountCreationForm: UserAccountCreationForm){
        try { 
            const userAccount: UserAccount = this.userAccountFactory.initializeUserAccount(aUserAccountCreationForm) 
        } catch (error) {
            
        }
    }
    getUserAccountById(userId: string){
        const userAccount: UserAccount = this.userAccountRepository.getUserAccount(userId)
        return userAccount
    }
    updateUserAccount(userAccount: UserAccount){
        console.log(userAccount);
    }
    deleteUserAccount(userId: string){
        console.log(userId);
    }
    isOTPValid(userId: string, OTP: number){
        return true
    }
}

export default UserAccountApplicationService