import ITUAndISOSpecId from "./ITUAndISOSpecId";

class ITUAndISOSpec {
  protected id: ITUAndISOSpecId;
  protected countryID: string;
  protected countryCode: string;
  protected callingCode: string;

  constructor(
    aId: ITUAndISOSpecId,
    aCountryID: string,
    aCountryCode: string,
    aCallingCode: string
  ) {
    this.setID(aId);
    this.setCountryID(aCountryID);
    this.setCountryCode(aCountryCode);
    this.setCallingCode(aCallingCode);
  }

  private setID(aId: ITUAndISOSpecId) {
    this.id = aId;
  }

  private setCountryID(aCountryID: string) {
    this.countryID = aCountryID;
  }

  private setCountryCode(aCountryCode: string) {
    this.countryCode = aCountryCode;
  }

  private setCallingCode(aCallingCode: string) {
    this.callingCode = aCallingCode;
  }

  // private getSevenDigitCode(): string {
  //   return Math.floor(1000000 + Math.random() * 9000000).toString();
  // }

  getCompletePhoneNumber(aNumber: string): string {
    const completeNumber = "+" + this.callingCode + aNumber;
    return completeNumber;
  }

  getId() {
    return this.id;
  }
}

export default ITUAndISOSpec;
