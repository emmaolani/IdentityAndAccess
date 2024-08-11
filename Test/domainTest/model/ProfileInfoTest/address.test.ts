import Address from "../../../../src/domain/model/PersonalInfo/address";


describe('Unit test for address class', () => {
    it('should return users country and address ids when required', () => {
        let countryId: string = 'countryID';
        let stateId: string = 'stateID';

        const address: Address = new Address(countryId, stateId);
        const {country, state} = address.getDetails();

        expect(country).toBe('countryID');
        expect(state).toBe('stateID');
    });
})