/* import UserAccountPersonalInfo from "../userAccountPersonalInfo/userAccountPersonalInfo"
import UserAccountID from "./userAccountID";
import UserAccountCreationForm from "./userAccountForm";
import EmailAddress from "./emailAddress";

class UserAccount {
    private userAccountID: UserAccountID;
    private personalInfo: UserAccountPersonalInfo;
    private emailAddress: EmailAddress
    private password: string;
    private status: string;
    constructor(aUserAccountID: UserAccountID, aPersonalInfo: UserAccountPersonalInfo, 
        aUserAccountCreationForm: UserAccountCreationForm) {
        this.setUserAccountID(aUserAccountID);
        this.setPersonalInfo(aPersonalInfo);
        this.setSecurityCredential(aUserAccountCreationForm.password);
        this.setStatus(aUserAccountCreationForm.status);
    }

    private setUserAccountID(aUserAccountID: UserAccountID){
        this.userAccountID = aUserAccountID;
        
    }

    private setPersonalInfo(aPersonalInfo: UserAccountPersonalInfo){
       this.personalInfo = aPersonalInfo; 
    }

    private setSecurityCredential(aSecurityCredential: string){
        this.password = aSecurityCredential;
        
    }

    private setStatus(aStatus: string){
        this.status = aStatus;
    }

    private id(){
        return this.userAccountID
    }
   
}

export default UserAccount;
*/