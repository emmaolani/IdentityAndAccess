import UserAccountProfileForm from "../userAccount/userAccountPersonalInfo/userAccountPersonalForm";
import VerificationCode from "./verificationCode";
import ValueObject from "../../valueObject";

 class EmailAddress extends ValueObject{
    value: string;
    isVerified: boolean;
    verificationToken: VerificationCode;
    constructor(aUserAccountProfileForm: UserAccountProfileForm){
      super()
    }
  }

export default EmailAddress