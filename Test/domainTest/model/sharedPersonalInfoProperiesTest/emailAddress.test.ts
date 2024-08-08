import EmailAddress from "../../../../src/domain/model/sharedPersonalInfoDetails/emailAddress";
import VerificationCode from "../../../../src/domain/model/sharedPersonalInfoDetails/verificationCode";

describe('Unit Test for EmailAddress class', () => {
    it('should remove white spaces from email address', ()=>{
        const email = ' tes t@coral.com ';

        const emailAddress = new EmailAddress(email, true, null);

        expect(emailAddress.getValue()).toBe('test@coral.com')
    })

    it('should throw an error if email is not active', ()=>{
        const email = 'test@coral.com';

        const emailAddress = new EmailAddress(email, false, null);

        expect(() => emailAddress.getValue()).toThrow('Email is not active');
    })

    it('should activate email address with valid verification code', ()=>{
        const email = 'test@coral.com';

        const code = '1234567';
        const timeStamp = Date.now();

        const verificationCode = new VerificationCode(code, timeStamp);
        const emailAddress = new EmailAddress(email, false, verificationCode);

        emailAddress.activateEmailAddress(code);

        expect(emailAddress.getValue()).toBe(email);
    })

    it('should not activate email address with expired verification code', ()=>{
        const email = 'test@coral.com';

        const code = '1234567';
        const expiredTimeStamp = 1722885594112;

        const verificationCode = new VerificationCode(code, expiredTimeStamp);
        const emailAddress = new EmailAddress(email, false, verificationCode);

        expect(() => emailAddress.activateEmailAddress(code)).toThrow('This code is expired');
    })

    it('should not activate email address with invalid verification code', ()=>{
        const email = 'test@coral.com';

        const code = '1234567';
        const invalidCode = '7654321';
        const timeStamp = Date.now();

        const verificationCode = new VerificationCode(code, timeStamp);
        const emailAddress = new EmailAddress(email, false, verificationCode);

        expect(() => emailAddress.activateEmailAddress(invalidCode)).toThrow('Invalid code');

    })
})

