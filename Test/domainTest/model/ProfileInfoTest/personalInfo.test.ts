import PersonalInfo from "../../../../src/domain/model/PersonalInfo/personalInfo";
import FullName from "../../../../src/domain/model/PersonalInfo/fullName";
import BirthDate from "../../../../src/domain/model/PersonalInfo/birthDate";
import Address from "../../../../src/domain/model/PersonalInfo/address";
import EmailAddress from "../../../../src/domain/model/PersonalInfo/emailAddress";
import PhoneNumber from "../../../../src/domain/model/PersonalInfo/phoneNumber";
import VerificationCode from "../../../../src/domain/model/PersonalInfo/verificationCode";

let fullName: FullName;

let birthDate: BirthDate;

let address: Address;

let validVerificationCode: VerificationCode ;
let expiredVerificationCode: VerificationCode;

let activatedEmailAddress: EmailAddress;
let emailAddressWithValidCode: EmailAddress;
let emailAddressWithInValidCode: EmailAddress;

let activatedPhoneNumber: PhoneNumber;
let phoneNumberWithValidCode: PhoneNumber;
let phoneNumberWithInValidCode: PhoneNumber;

let personalInfo: PersonalInfo;
let personalInfoWithEmailAndPhoneNumberWithInvalidCode: PersonalInfo;
let personalInfoWithEmailAndPhoneNumberWithValidCode: PersonalInfo;   



describe('PersonalInfo', () => {

    it('should create PersonalInfo instance', () => {
        expect(personalInfo).toBeInstanceOf(PersonalInfo);
        expect(personalInfoWithEmailAndPhoneNumberWithInvalidCode).toBeInstanceOf(PersonalInfo);
        expect(personalInfoWithEmailAndPhoneNumberWithValidCode).toBeInstanceOf(PersonalInfo);
    });

    it('should change fullname', () => {
        let newFullName: FullName = new FullName('Jane', 'Doe');

        personalInfo.changeFullName(newFullName);

        expect(personalInfo.getFullName()).toEqual('Jane Doe');
    })

    it('should change birthdate', () => {
        let newBirthDate: BirthDate = new BirthDate('1990-01-02');

        personalInfo.changeBirthDate(newBirthDate);

        expect(personalInfo.getBirthDate()).toEqual('1990-01-02');
    })  

    it('should change address', () => {
        let newAddress: Address = new Address('newcountryId', 'newstateId');

        personalInfo.changeAddress(newAddress);

        expect(personalInfo.getAddress()).toEqual({addressCountryId: 'newcountryId', addressStateId: 'newstateId'});
    })

    it('should change email address', () => {
        let newEmailAddress: EmailAddress = new EmailAddress('nonAdmin@coral.com', true, null);

        personalInfo.changeEmailAddress(newEmailAddress);

        expect(personalInfo.getEmailAddress()).toEqual('nonAdmin@coral.com');    
    })
    


    // refreshing all objects before each testcases
    const refreshobject = () => {
    fullName = new FullName('John', 'Doe');

    birthDate = new BirthDate('1990-01-01');

    address = new Address('countryId', 'stateId');

    validVerificationCode = new VerificationCode('1234567', Date.now());
    expiredVerificationCode = new VerificationCode('1234567', Date.now() - 50000);

    activatedEmailAddress = new EmailAddress('admin@coral.com', true, null);
    emailAddressWithValidCode= new EmailAddress('admin@coral.com', false, validVerificationCode);
    emailAddressWithInValidCode =  new EmailAddress('admin@coral.com', false, expiredVerificationCode);
    
    activatedPhoneNumber = new PhoneNumber('123456789', 'specId', true, null);
    phoneNumberWithValidCode = new PhoneNumber('123456789', 'specId', false, validVerificationCode);
    phoneNumberWithInValidCode = new PhoneNumber('123456789', 'specId', false, expiredVerificationCode);

    personalInfo = new PersonalInfo(fullName, birthDate, address, activatedEmailAddress, activatedPhoneNumber);
    personalInfoWithEmailAndPhoneNumberWithInvalidCode = new PersonalInfo(fullName, birthDate, address, emailAddressWithInValidCode, phoneNumberWithInValidCode);
    personalInfoWithEmailAndPhoneNumberWithValidCode = new PersonalInfo(fullName, birthDate, address, emailAddressWithValidCode, phoneNumberWithValidCode);
    }

    beforeEach(refreshobject);
});







