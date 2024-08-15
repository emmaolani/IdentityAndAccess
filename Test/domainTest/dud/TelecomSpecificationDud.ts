import ITUandISOSpecs from "../../../src/domain/model/globalSettings/telecomSpecification";


class ITUandISOSpecsDud extends ITUandISOSpecs{
    constructor(aId: string, aCountryID: string, aCountryCode: string, aPhoneNumberLength: number) {
        super(aId, aCountryID, aCountryCode, aPhoneNumberLength);
    }
    Data(){
        return {
            id: this.id,
            countryID: this.countryID,
            countryCode: this.countryCode,
            callingCode: this.callingCode
        }
    }
}


export default ITUandISOSpecsDud;