import PersonalInfo from "../../src/domain/model/PersonalInfo/personalInfo";
import FullName from "../../src/domain/model/PersonalInfo/fullName";
import BirthDate from "../../src/domain/model/PersonalInfo/birthDate";
import Address from "../../src/domain/model/PersonalInfo/address";
import EmailAddress from "../../src/domain/model/PersonalInfo/emailAddress";
import PhoneNumber from "../../src/domain/model/PersonalInfo/phoneNumber";
import VerificationCode from "../../src/domain/model/PersonalInfo/verificationCode";
import { option } from "./option";


class PersonalInfoFactory{

    getPersonalInfoWith(anOption: option): PersonalInfo {
        const fullName = this.getFullName();
        const birthDate = this.getBirthDate();
        const address = this.getAddress()
        const emailAddress= this.getEmailWith(anOption);
        const phoneNumber = this.getPhoneNumber(anOption);

        const personalInfo: PersonalInfo = new PersonalInfo(fullName, birthDate, address, emailAddress, phoneNumber);

        return personalInfo
    }

    private getFullName(): FullName {
        return new FullName('John', 'Doe');
    }

    private getBirthDate(): BirthDate {
        return new BirthDate('1990-01-01');
    }

    private getAddress(): Address {
        return new Address('countryId', 'stateId');
    }

    private getEmailWith(anOption: option): EmailAddress {
        const verificationCode = this.getVerificationCode(anOption.emailVerificationCodeType);

        if (anOption.emailType === 'active'){
            return new EmailAddress('admin@coral.com', true, verificationCode);
        } else if(anOption.emailType === 'inActive'){
            return new EmailAddress('admin@coral.com', false, verificationCode);
        }
        
        throw new Error('Invalid option type');
    }

    private getPhoneNumber(anOption: option): PhoneNumber {     
        const verificationCode = this.getVerificationCode(anOption.phoneVerificationCodeType);

        if (anOption.phoneType === 'active'){
            return new PhoneNumber('123456789', 'specId', true, verificationCode);
        } else if(anOption.phoneType === 'inActive'){
            return new PhoneNumber('123456789', 'specId', false, verificationCode);
        }

        throw new Error('Invalid option type');
    }

    getVerificationCode(type: string): VerificationCode | null {   
        if(type === 'new'){
            return new VerificationCode('1234567', Date.now());
        } else if(type === 'expired'){
            return new VerificationCode('1234567', Date.now() - 500000); 
        } else if(type === 'null'){
            return null;
        }  

        throw new Error('Invalid option type');
    }
    
}


export default PersonalInfoFactory;