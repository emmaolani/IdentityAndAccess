import UserAccountCreationForm from "./userAccountCreationForm";

class Address {
    private countryID: string;
    private stateID: string;

    constructor(aUserAccountCreationForm: UserAccountCreationForm){
       this.setCountry(aUserAccountCreationForm.country)
       this.setState(aUserAccountCreationForm.state)
    }

    private setCountry(aCountryID: string){
        this.countryID = aCountryID
    }

    private setState(aStateID: string){
        this.stateID = aStateID
    }
}

export default Address