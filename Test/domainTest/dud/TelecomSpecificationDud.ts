import TelcomSpecification from "../../../src/domain/model/globalSettings/telecomSpecification";


class TelcomSpecificationDud extends TelcomSpecification{
    constructor(aId: string, aCountryID: string, aCountryCode: string, aPhoneNumberLength: number) {
        super(aId, aCountryID, aCountryCode, aPhoneNumberLength);
    }
    Data(){
        return {
            id: this.id,
            countryID: this.countryID,
            countryCode: this.countryCode,
            phoneNumberLength: this.phoneNumberLength
        }
    }
}


export default TelcomSpecificationDud;