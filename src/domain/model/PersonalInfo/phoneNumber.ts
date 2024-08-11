import ValueObject from "../../valueObject";
import VerificationCode from "./verificationCode";


class PhoneNumber extends ValueObject{
    private number: string;
    private telcomSpecificationID: string; // This is the ID of the telcom specification that this phone number belongs to
    private isActive: string;
    private verificationCode: VerificationCode | null;

}


export default PhoneNumber