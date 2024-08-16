import PhoneNumber from "../PersonalInfo/phoneNumber";
import VerificationCode from "../PersonalInfo/verificationCode";


class ITUandISOSpecs {
    protected id: string;
    protected countryID: string;
    protected countryCode: string;
    protected callingCode: string;

  constructor(aId: string, aCountryID: string, aCountryCode: string, aCallingCode: string) {
    this.setID(aId);
    this.setCountryID(aCountryID);
    this.setCountryCode(aCountryCode);
    this.setCallingCode(aCallingCode);
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

  private setCallingCode(aCallingCode: string) {
    this.callingCode = aCallingCode;
  };


  newPhoneNumber(aPhoneNumber: string) {
    const verificationCode: VerificationCode  = this.newVerificationCode(); 
    return new PhoneNumber(aPhoneNumber, this.id, false, verificationCode);
  };

  private newVerificationCode(): VerificationCode {
    const sevenDigitCode = this.getSevenDigitCode();
    return new VerificationCode(sevenDigitCode, Date.now());
  };

  private getSevenDigitCode(): string {
    return Math.floor(1000000 + Math.random() * 9000000).toString();
  };


  getCompletePhoneNumber(aNumber: string): string {
    const completeNumber = '+' + this.callingCode + aNumber
    return completeNumber
  }

};


export default ITUandISOSpecs;