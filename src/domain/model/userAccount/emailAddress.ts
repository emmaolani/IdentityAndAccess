import UserAccountCreationForm from "./userAccountCreationForm";

 class EmailAddress {
    emailAddress: string;
    isVerified: boolean;
    verificationToken: string;
    constructor(aUserAccountCreationForm: UserAccountCreationForm){
        this.emailAddress = aUserAccountCreationForm.email
    }
  }

export default EmailAddress