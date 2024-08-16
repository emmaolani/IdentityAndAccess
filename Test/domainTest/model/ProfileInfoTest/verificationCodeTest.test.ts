import VerificationCode from "../../../../src/domain/model/PersonalInfo/verificationCode";


describe('Unit test for verificationCode class', () => {
    const validCode = '1234567';
    const stringCode = 'string';
    const floatNumberCode = '543.666';
    const shortCode = '123456';
    const longCode = '12345678';

    const timeStamp = Date.now();
    const largeTimeStamp = 203011722885594112;
    const negativeTimeStamp = -1
    const expiredTimeStamp = 1722885594112

    
    it('should throw an error if code is not an integer', ()=>{        
        expect(() => new VerificationCode(stringCode, timeStamp)).toThrow('invalid code')
        expect(() => new VerificationCode(floatNumberCode, timeStamp)).toThrow('invalid code')

    })

    it('should throw an error if code is not exactly 7 digits', ()=>{
        expect(() => new VerificationCode(shortCode, timeStamp)).toThrow('invalid code length');
        expect(() => new VerificationCode(longCode, timeStamp)).toThrow('invalid code length');
    });

    it('should throw error if timestamp is greater than current timestamp or lesser than 0', ()=>{
        expect(() => new VerificationCode(validCode, largeTimeStamp)).toThrow('TimeStamp is invalid')
        expect(() => new VerificationCode(validCode, negativeTimeStamp)).toThrow('TimeStamp is invalid')
    })

    it('should retrieve valid code that has not expired', ()=>{
        const validVerificationCode = new VerificationCode(validCode, timeStamp);
        const expiredVerificationCode = new VerificationCode(validCode, expiredTimeStamp);
        
        expect(validVerificationCode.getValue()).toBe(validCode)
        expect(() => expiredVerificationCode.getValue()).toThrow('This code is expired')
    });
})
