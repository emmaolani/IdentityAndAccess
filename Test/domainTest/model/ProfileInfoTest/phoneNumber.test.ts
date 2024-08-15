import PhoneNumber from "../../../../src/domain/model/PersonalInfo/phoneNumber";
import VerificationCode from "../../../../src/domain/model/PersonalInfo/verificationCode";


describe('Unit Test for PhoneNumber class', () => {
    let invalidPhoneNumber: string;
    let validPhoneNumber: string;

    let telcomSpecificationID: string;

    let active: boolean;
    let notActive: boolean;

    let emptyVerificationCode: null;
    let expiredverificationCode: VerificationCode;
    let validVerificationCode: VerificationCode;

    beforeEach(() => {
        invalidPhoneNumber = ' 123  456 78  ';
        validPhoneNumber = '12345678';

        telcomSpecificationID = 'id';

        active = true;
        notActive = false;

        emptyVerificationCode = null;
        expiredverificationCode = new VerificationCode('1234567', 1722885594112);
        validVerificationCode = new VerificationCode('1234567', Date.now());
    });

    it('should remove white spaces from phone number', ()=>{
        const phoneNumber = new PhoneNumber(invalidPhoneNumber, telcomSpecificationID, active, validVerificationCode);
        
        expect(phoneNumber.getValue()).toBe(validPhoneNumber);
    })

    it('should throw an error if phone number is not active', ()=>{
        const phoneNumber = new PhoneNumber(validPhoneNumber, telcomSpecificationID, notActive, validVerificationCode);

        expect(() => phoneNumber.getValue()).toThrow('Phone number is not active');
    });

    it('should return the correct telcom specification ID if phone number is active', ()=>{
        const phoneNumber = new PhoneNumber(validPhoneNumber, telcomSpecificationID, active, validVerificationCode);

        expect(phoneNumber.getTelcomSpecificationID()).toBe(telcomSpecificationID);
    });

    it('should throw an error if phone number is not active', ()=>{
        const phoneNumber = new PhoneNumber(validPhoneNumber, telcomSpecificationID, notActive, validVerificationCode);

        expect(() => phoneNumber.getTelcomSpecificationID()).toThrow('Phone number is not active');
    });

    it('should activate phone number with valid verification code', ()=>{
        const phoneNumber = new PhoneNumber(validPhoneNumber, telcomSpecificationID, notActive, validVerificationCode);

        phoneNumber.activatePhoneNumberWith(validVerificationCode.getValue());

        expect(phoneNumber.getValue()).toBe(validPhoneNumber);
    });

    it('should not activate phone number with expired verification code', ()=>{
        const phoneNumber = new PhoneNumber(validPhoneNumber, telcomSpecificationID, notActive, expiredverificationCode);

        expect(() => phoneNumber.activatePhoneNumberWith(expiredverificationCode.getValue())).toThrow('This code is expired');
    });

    it('should not activate phone number with invalid verification code', ()=>{
        const phoneNumber = new PhoneNumber(validPhoneNumber, telcomSpecificationID, notActive, validVerificationCode);

        expect(() => phoneNumber.activatePhoneNumberWith('invalidCode')).toThrow('Invalid code');
    });

    it('should throw an error on phone number activation if phone number is already active', ()=>{
        const phoneNumber = new PhoneNumber(validPhoneNumber, telcomSpecificationID, active, emptyVerificationCode);

        expect(() => phoneNumber.activatePhoneNumberWith('code')).toThrow('Phone number is already activated');
    });
});