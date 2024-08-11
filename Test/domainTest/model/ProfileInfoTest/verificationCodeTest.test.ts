import VerificationCode from "../../../../src/domain/model/PersonalInfo/verificationCode";


describe('Unit test for verificationCode class', () => {

    it('should throw an error if code is not an integer', ()=>{
        const stringCode = 'string';
        const floatCode = '543.666';

        const timeStamp = Date.now();
        
        expect(() => new VerificationCode(stringCode, timeStamp)).toThrow('invalid code')
        expect(() => new VerificationCode(floatCode, timeStamp)).toThrow('invalid code')

    })

    it('should throw an error if code is not exactly 7 digits', ()=>{
        const sevenDigitCode = '123456';
        const eightDigitCode = '12345678';

        const timeStamp = Date.now();

        expect(() => new VerificationCode(sevenDigitCode, timeStamp)).toThrow('invalid code length');
        expect(() => new VerificationCode(eightDigitCode, timeStamp)).toThrow('invalid code length');
    });

    it('should throw error if validationCode timestamp is greater than current timestamp or lesser than 0', ()=>{
        const code = '1234567';

        const largeTimeStamp = 203011722885594112;
        const negativeTimeStamp = -1

        expect(() => new VerificationCode(code, largeTimeStamp)).toThrow('TimeStamp is invalid')
        expect(() => new VerificationCode(code, negativeTimeStamp)).toThrow('TimeStamp is invalid')
    })

    it('should retrieve valid code that has not expired', ()=>{
        const code = '1234567';

        const timeStamp = Date.now();
        const expiredTimeStamp = 1722885594112

        const validVerificationCode = new VerificationCode(code, timeStamp);
        const expiredVerificationCode = new VerificationCode(code, expiredTimeStamp);
        
        expect(validVerificationCode.getValue()).toBe(code)
        expect(() => expiredVerificationCode.getValue()).toThrow('This code is expired')
    });
})