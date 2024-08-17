import PersonalInfo from "../../../../src/domain/model/PersonalInfo/personalInfo";
import FullName from "../../../../src/domain/model/PersonalInfo/fullName";
import BirthDate from "../../../../src/domain/model/PersonalInfo/birthDate";
import Address from "../../../../src/domain/model/PersonalInfo/address";
import EmailAddress from "../../../../src/domain/model/PersonalInfo/emailAddress";
import PhoneNumber from "../../../../src/domain/model/PersonalInfo/phoneNumber";
import VerificationCode from "../../../../src/domain/model/PersonalInfo/verificationCode";
import { option } from "../../../factories/option";
import PersonalInfoFactory from "../../../factories/personalInfoFactory";




describe('PersonalInfo', () => {
    const defaultOption: option = {
        emailType: 'active',
        phoneType: 'active',
        phoneVerificationCodeType: 'new',
        emailVerificationCodeType: 'new'
    }

    const personalInfoFactory = new PersonalInfoFactory();


    
    it('should create PersonalInfo instance', () => {
        const personalInfo: PersonalInfo = personalInfoFactory.getPersonalInfoWith(defaultOption); 
        expect(personalInfo).toBeInstanceOf(PersonalInfo);
    });

    it('should change fullname', () => {
        const personalInfo: PersonalInfo = personalInfoFactory.getPersonalInfoWith(defaultOption); 

        const newFullName: FullName = new FullName('Jane', 'Doe');

        personalInfo.changeFullName(newFullName);

        expect(personalInfo.getFullName()).toEqual('Jane Doe');
    })

    it('should change birthdate', () => {
        const personalInfo: PersonalInfo = personalInfoFactory.getPersonalInfoWith(defaultOption); 

        const newBirthDate: BirthDate = new BirthDate('1990-01-02');

        personalInfo.changeBirthDate(newBirthDate);

        expect(personalInfo.getBirthDate()).toEqual('1990-01-02');
    })  

    it('should change address', () => {
        const personalInfo: PersonalInfo = personalInfoFactory.getPersonalInfoWith(defaultOption); 

        const newAddress: Address = new Address('newcountryId', 'newstateId');

        personalInfo.changeAddress(newAddress);

        expect(personalInfo.getAddress()).toEqual({addressCountryId: 'newcountryId', addressStateId: 'newstateId'});
    })




    it('should change email address', () => {
        let personalInfo: PersonalInfo = personalInfoFactory.getPersonalInfoWith(defaultOption); 

        let newEmailAddress: EmailAddress = new EmailAddress('nonAdmin@coral.com', true, null);

        personalInfo.changeEmailAddress(newEmailAddress);

        expect(personalInfo.getEmailAddress()).toEqual('nonAdmin@coral.com');    
    })

    it('should not return email address unless email is activated', () => {
        const option: option = {
            emailType: 'inActive',
            phoneType: 'active',
            phoneVerificationCodeType: 'new',
            emailVerificationCodeType: 'new'
        }

        const personalInfo = personalInfoFactory.getPersonalInfoWith(option);

        expect(()=> personalInfo.getEmailAddress()).toThrow('Email is not active');

        personalInfo.activateEmailAddressWith('1234567');

        expect(personalInfo.getEmailAddress()).toEqual('admin@coral.com');

    })

    it('should throw an error if email is being activated with wrong code', () => {
        const option: option = {
            emailType: 'inActive',
            phoneType: 'active',
            phoneVerificationCodeType: 'new',
            emailVerificationCodeType: 'new'
        }

        const personalInfo = personalInfoFactory.getPersonalInfoWith(option);

        expect(()=> personalInfo.activateEmailAddressWith('123456')).toThrow('Invalid code');
    })

    it('should throw an error if active email is being activated', () => {
        const option: option = {
            emailType: 'active',
            phoneType: 'active',
            phoneVerificationCodeType: 'null',
            emailVerificationCodeType: 'null'
        }

        const personalInfo = personalInfoFactory.getPersonalInfoWith(option);

        expect(()=> personalInfo.activateEmailAddressWith('1234567')).toThrow('Email is already activated');
    })

    it('should throw an error if no verification code is found in personalInfo email', () => {
        const option: option = {
            emailType: 'inActive',
            phoneType: 'active',
            phoneVerificationCodeType: 'null',
            emailVerificationCodeType: 'null'
        }

        const personalInfo = personalInfoFactory.getPersonalInfoWith(option);

        expect(()=> personalInfo.activateEmailAddressWith('1234567')).toThrow('No verification code found');
    })  

   
});



