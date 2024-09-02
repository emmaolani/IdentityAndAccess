import PhoneNumberValidator from "../../application/phoneNumberValidator";
import libphonenumber from "google-libphonenumber";
import { phoneNumberError } from "../../domain/enum/errors/errorMsg";

class PhoneNumberValidatorImp implements PhoneNumberValidator {
  private phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
  getValidNationalNumberForRegion(
    phoneNumber: string,
    countryCode: string
  ): string {
    const number = this.phoneUtil.parse(phoneNumber, countryCode);

    if (!this.phoneUtil.isValidNumberForRegion(number, countryCode)) {
      throw new Error(phoneNumberError.invalidPhoneNumber);
    }

    return this.formatPhoneNumberToString(number.getNationalNumber());
  }

  private formatPhoneNumberToString(phoneNumber: number | undefined): string {
    if (!phoneNumber) {
      throw new Error(phoneNumberError.invalidPhoneNumber);
    }
    return phoneNumber.toString();
  }
}

export default PhoneNumberValidatorImp;
