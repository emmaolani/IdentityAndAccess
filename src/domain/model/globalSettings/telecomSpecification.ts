

class TelcomSpecification {
    protected id: string;
    protected countryID: string;
    protected countryCode: string;
    protected phoneNumberLength: number;

  constructor(aId: string, aCountryID: string, aCountryCode: string, aPhoneNumberLength: number) {
    this.setID(aId);
    this.setCountryID(aCountryID);
    this.setCountryCode(aCountryCode);
    this.setPhoneNumberLength(aPhoneNumberLength);
  };

  private setID(aId: string) {
    this.id = aId;
  };

  private setCountryID(aCountryID: string) {
    this.countryID = aCountryID;
  };

  private setCountryCode(aCountryCode: string) {
    this.countryCode = aCountryCode;
  }; 

  private setPhoneNumberLength(aPhoneNumberLength: number) {
    this.phoneNumberLength = aPhoneNumberLength;
  };

};


export default TelcomSpecification;