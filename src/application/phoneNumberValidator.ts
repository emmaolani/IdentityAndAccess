interface PhoneNumberValidator {
  getValidNationalNumberForRegion(
    phoneNumber: string,
    countryCode: string
  ): string;
}

export default PhoneNumberValidator;
