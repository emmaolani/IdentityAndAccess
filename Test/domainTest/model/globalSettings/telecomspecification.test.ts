import TelcomSpecificationDud from "../../dud/TelecomSpecificationDud";

describe('TelecomSpecification', () => {
    let telecomSpecification: TelcomSpecificationDud;
    let id: string;
    let countryID: string;
    let countryCode: string;
    let phoneNumberLength: number;

    beforeEach(() => {
        id = 'id';
        countryID = 'countryID';
        countryCode = 'countryCode';
        phoneNumberLength = 10;
        telecomSpecification = new TelcomSpecificationDud(id, countryID, countryCode, phoneNumberLength);
    });


    it('should create an instance', () => {
        expect(telecomSpecification).toBeTruthy();
    });

    it('should return the correct data', () => {
        expect(telecomSpecification.Data()).toEqual({
            id: id,
            countryID: countryID,
            countryCode: countryCode,
            phoneNumberLength: phoneNumberLength
        });
    });
    
});