import ValueObject from "../../valueObject";


class Address extends ValueObject{
    private countryId: string;
    private stateId: string;

    constructor(aCountryId: string, aStateId: string){
      super();      
      this.setCountry(aCountryId);
      this.setState(aStateId);
    }

    private setCountry(aCountryId: string){
        this.countryId = aCountryId;
    }

    private setState(aStateId: string){
        this.stateId = aStateId;
    }

    getDetails(){
        return this.createAddressInObjFormat()
    }

    private createAddressInObjFormat(){
        const country = this.countryId
        const state = this.stateId
        return {country, state}
    }
}


export default Address;