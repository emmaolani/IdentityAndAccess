import ITUandISOSpecsDud from "../../mock/ituAndIsoSpecsMock";
import PhoneNumber from "../../../../src/domain/model/PersonalInfo/phoneNumber";


describe('ITUandISOSpecs', () => {
    let ituAndIsospecs: ITUandISOSpecsDud;
    let id: string;
    let countryID: string;
    let countryCode: string;
    let callingCode: string;

    
    beforeEach(() => {
        id = 'id';
        countryID = 'countryID';
        countryCode = 'countryCode';
        callingCode = '234';
        ituAndIsospecs = new ITUandISOSpecsDud(id, countryID, countryCode, callingCode);
    });


    it('should create an instance', () => {
        expect(ituAndIsospecs).toBeTruthy();
    });

    it('should return the correct data', () => {
        expect(ituAndIsospecs.Data()).toEqual({
            id: id,
            countryID: countryID,
            countryCode: countryCode,
            callingCode: callingCode
        });
    });

    it('should create a phone number', () => {
        expect(ituAndIsospecs.newPhoneNumber('12345678')).toBeInstanceOf(PhoneNumber);
    });

    it('should get complete phone number', () => {
        expect(ituAndIsospecs.getCompletePhoneNumber('12345678')).toBe('+23412345678');
    });

});
