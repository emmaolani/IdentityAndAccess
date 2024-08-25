import ValueObject from "../../../valueObject";

class Address extends ValueObject {
  private countryId: string;
  private stateId: string;

  constructor(aCountryId: string, aStateId: string) {
    super();
    this.setCountry(aCountryId);
    this.setState(aStateId);
  }

  private setCountry(aCountryId: string) {
    this.countryId = aCountryId;
  }

  private setState(aStateId: string) {
    this.stateId = aStateId;
  }

  getAddress() {
    const addressCountryId = this.countryId;
    const addressStateId = this.stateId;
    return { addressCountryId, addressStateId };
  }
}

export default Address;
