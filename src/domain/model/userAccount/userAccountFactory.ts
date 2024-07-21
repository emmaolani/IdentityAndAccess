import UserAccount from "./userAccount";
import UserAccountID from "./userAccountID";
import UserAccountPersonalInfo from "./userAccountPersonalInfo";
import UserAccountContactDetails from "./fullName";
import Address from "./address";
import UserAccountCreationForm from "./userAccountCreationForm";
import UUIDGeneratorService from "../../service/uuidGeneratorService";

class UserAccountFactory{
    initializeUserAccount(aUserAccountCreationForm: UserAccountCreationForm){

        this.applyIDTo(aUserAccountCreationForm);
        this.applyStatusTo(aUserAccountCreationForm)
        this.applyOTP(aUserAccountCreationForm)

        const userAccountID: UserAccountID = this.initializeUserAccountID(aUserAccountCreationForm);

        const personalInfo: UserAccountPersonalInfo = this.initializePersonalInfo(aUserAccountCreationForm);

        const userAccount: UserAccount = new UserAccount(userAccountID, personalInfo, aUserAccountCreationForm);
        
        return userAccount;
    }
    private applyIDTo(aUserAccountCreationForm: UserAccountCreationForm){
        if (aUserAccountCreationForm.id === "none") {
            const uuidGeneratorService: UUIDGeneratorService = new UUIDGeneratorService();
            aUserAccountCreationForm.id = uuidGeneratorService.generateUUID();
        } else {
            return 
        }
    }

    private applyStatusTo(aUserAccountCreationForm: UserAccountCreationForm){
        if (aUserAccountCreationForm.id === "none") {
            aUserAccountCreationForm.status = "awaiting email verififation";
        } else {
            return
        }
    }

    private applyOTP(aUserAccountCreationForm: UserAccountCreationForm){
        if (aUserAccountCreationForm.id === "none") {
            aUserAccountCreationForm.OTP = 0;
        } else {
            return
        }
    }

    private initializeUserAccountID(aUserAccountCreationForm: UserAccountCreationForm){
        return new UserAccountID(aUserAccountCreationForm);
    }

    private initializePersonalInfo(aUserAccountCreationForm: UserAccountCreationForm){

        const contactDetails: UserAccountContactDetails = this.initializeContactDetails(aUserAccountCreationForm);

        const homeAddress: Address = this.initializeHomeAddress(aUserAccountCreationForm);

        return new UserAccountPersonalInfo(contactDetails, homeAddress);
    }

    private initializeContactDetails(aUserAccountCreationForm: UserAccountCreationForm){
        return new UserAccountContactDetails(aUserAccountCreationForm);
    }

    private initializeHomeAddress(aUserAccountCreationForm: UserAccountCreationForm){
        return new Address(aUserAccountCreationForm);
    }

}


export default UserAccountFactory