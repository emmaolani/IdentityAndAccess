import ITUandISOSpecsDud from "../../dud/TelecomSpecificationDud";
import PhoneNumber from "../../../../src/domain/model/PersonalInfo/phoneNumber";

describe('ITUandISOSpecs', () => {
    let specs: ITUandISOSpecsDud;
    let id: string;
    let countryID: string;
    let countryCode: string;
    let callingCode: number;

    beforeEach(() => {
        id = 'id';
        countryID = 'countryID';
        countryCode = 'countryCode';
        callingCode = 234;
        specs = new ITUandISOSpecsDud(id, countryID, countryCode, callingCode);
    });


    it('should create an instance', () => {
        expect(specs).toBeTruthy();
    });

    it('should return the correct data', () => {
        expect(specs.Data()).toEqual({
            id: id,
            countryID: countryID,
            countryCode: countryCode,
            callingCode: callingCode
        });
    });

    it('should create a phone number', () => {
        expect(specs.newPhoneNumber('12345678')).toBeInstanceOf(PhoneNumber);
    });
    
});