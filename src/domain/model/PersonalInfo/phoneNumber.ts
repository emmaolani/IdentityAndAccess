import ValueObject from "../../valueObject";
import VerificationCode from "./verificationCode";


class PhoneNumber extends ValueObject{
    private value: string;
    private telcomSpecificationID: string; // This is the ID of the telcom specification that this phone number belongs to
    private isActive: boolean;
    private verificationCode: VerificationCode | null;

    
    constructor(value: string, telcomSpecificationID: string, isActive: boolean, 
        verificationCode: VerificationCode | null){
        super();
        this.setValue(value);
        this.setTelcomSpecificationID(telcomSpecificationID);
        this.setActiveStatus(isActive);
        this.setVerificationCode(verificationCode);
    };

    private setValue(aValue: string){
        const newValue = this.removeWhiteSpace(aValue);
        this.value = newValue;
    };

    private removeWhiteSpace(aValue: string): string{
        return aValue.replace(/\s+/g, '');
    };

    private setTelcomSpecificationID(aTelcomSpecificationID: string){
        this.telcomSpecificationID = aTelcomSpecificationID;
    };

    private setActiveStatus(aStatus: boolean){
        this.isActive = aStatus;
    };

    private setVerificationCode(aVerificationCode: VerificationCode | null){
        this.verificationCode = aVerificationCode;
    };


    getValue(): string {
        if(!this.isActive){
            throw new Error('Phone number is not active');
        };
        return this.value;
    };

    getTelcomSpecificationID(): string{
        if(!this.isActive){
            throw new Error('Phone number is not active');
        };
        return this.telcomSpecificationID;
    };

    activatePhoneNumberWith(code: string){
        if(this.isActive){
            throw new Error('Phone number is already activated');
        };

        if(this.verificationCode === null){
            throw new Error('No verification code found');
        };
        
        if(this.verificationCode.getValue() !== code){
            throw new Error('Invalid code');
        };

        this.isActive = true;
        this.removeVerificationCode();
    };

    private removeVerificationCode(){
        this.verificationCode = null
    };

};


export default PhoneNumber