import EmailAddress from "../../../../src/domain/model/PersonalInfo/emailAddress";
import VerificationCode from "../../../../src/domain/model/PersonalInfo/verificationCode";

describe('Unit Test for EmailAddress class', () => {
    let invalidEmail: string;
    let validEmail: string;

    let active: boolean;
    let notActive: boolean;

    let emptyVerificationCode: null;
    let expiredverificationCode: VerificationCode;
    let validVerificationCode: VerificationCode;

    beforeEach(() => {
        invalidEmail = ' tes t@coral.com ';
        validEmail = 'test@coral.com';

        active = true;
        notActive = false;

        emptyVerificationCode = null;
        expiredverificationCode = new VerificationCode('1234567', 1722885594112);
        validVerificationCode = new VerificationCode('1234567', Date.now());
    });

    it('should remove white spaces from email address', ()=>{
        const emailAddress = new EmailAddress(invalidEmail, active, validVerificationCode);

        expect(emailAddress.getValue()).toBe(validEmail);
    });

    it('should throw an error if email is not active', ()=>{
        const emailAddress = new EmailAddress(validEmail, notActive, validVerificationCode);

        expect(() => emailAddress.getValue()).toThrow('Email is not active');
    });

    it('should activate email address with valid verification code', ()=>{
        const emailAddress = new EmailAddress(validEmail, notActive, validVerificationCode);

        emailAddress.activateEmailAddressWith(validVerificationCode.getValue());

        expect(emailAddress.getValue()).toBe(validEmail);
    });

    it('should not activate email address with expired verification code', ()=>{
        const emailAddress = new EmailAddress(validEmail, notActive, expiredverificationCode);

        expect(() => emailAddress.activateEmailAddressWith(expiredverificationCode.getValue())).toThrow('This code is expired');
    });

    it('should not activate email address with invalid verification code', ()=>{
        const emailAddress = new EmailAddress(validEmail, notActive, validVerificationCode);

        expect(() => emailAddress.activateEmailAddressWith('123456')).toThrow('Invalid code');
    });

    it('should throw an error on email activation if email is already active', ()=>{
        const emailAddress = new EmailAddress(validEmail, active, emptyVerificationCode);

        expect(() => emailAddress.activateEmailAddressWith(validVerificationCode.getValue())).toThrow('Email is already activated');
    });
});

