import PhoneNumberValidator from "../../application/phoneNumberValidator";
import libphonenumber from "google-libphonenumber";
import { contactDetailErrorMsg } from "../../domain/model/contactDetails/contactDetailErrorMsg";

class PhoneNumberValidatorImp implements PhoneNumberValidator {
  private phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();

  getValidNationalNumberForRegion(
    phoneNumber: string,
    countryCode: string
  ): string {
    const number = this.phoneUtil.parse(phoneNumber, countryCode);

    if (!this.phoneUtil.isValidNumberForRegion(number, countryCode)) {
      throw new Error(contactDetailErrorMsg.invalidPhoneNumber);
    }

    return this.formatPhoneNumberToString(number.getNationalNumber());
  }

  private formatPhoneNumberToString(phoneNumber: number | undefined): string {
    if (!phoneNumber) {
      throw new Error(contactDetailErrorMsg.invalidPhoneNumber);
    }
    return phoneNumber.toString();
  }
}

export default PhoneNumberValidatorImp;
