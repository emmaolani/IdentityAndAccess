import PhoneNumberValidatorImp from "../../../src/port/util/phoneNumberValidatorImp";
import { phoneNumberError } from "../../../src/domain/enum/errorMsg/contactDetailErrorMsg";

describe("PhoneNumberValidator", () => {
  const phoneNumberValidator = new PhoneNumberValidatorImp();

  it("should validate number and return national number of mobile number", () => {
    expect(
      phoneNumberValidator.getValidNationalNumberForRegion("2234567899", "US")
    ).toBe("2234567899"); // valid US mobile number
    expect(
      phoneNumberValidator.getValidNationalNumberForRegion("+12234567899", "US")
    ).toBe("2234567899"); // valid US mobile number
    expect(
      phoneNumberValidator.getValidNationalNumberForRegion("12234567899", "US")
    ).toBe("2234567899"); // valid US mobile number

    expect(
      phoneNumberValidator.getValidNationalNumberForRegion("08123456789", "NG")
    ).toBe("8123456789"); // valid Nigeria mobile number
    expect(
      phoneNumberValidator.getValidNationalNumberForRegion(
        "+2349123456789",
        "NG"
      )
    ).toBe("9123456789"); // valid Nigeria mobile number
    expect(
      phoneNumberValidator.getValidNationalNumberForRegion(
        "2349123456789",
        "NG"
      )
    ).toBe("9123456789"); // valid Nigeria mobile number
    expect(
      phoneNumberValidator.getValidNationalNumberForRegion(
        "23407123456789",
        "NG"
      )
    ).toBe("7123456789"); // valid Nigeria mobile number
  });

  it("should throw error if number is invalid", () => {
    expect(() =>
      phoneNumberValidator.getValidNationalNumberForRegion("1234567890", "US")
    ).toThrow(phoneNumberError.invalidPhoneNumber); // invalid US number
    expect(() =>
      phoneNumberValidator.getValidNationalNumberForRegion("123456789", "US")
    ).toThrow(phoneNumberError.invalidPhoneNumber); // invalid US number
    expect(() =>
      phoneNumberValidator.getValidNationalNumberForRegion("223456789", "US")
    ).toThrow(phoneNumberError.invalidPhoneNumber); // invalid US number

    expect(() =>
      phoneNumberValidator.getValidNationalNumberForRegion("123456789", "NG")
    ).toThrow(phoneNumberError.invalidPhoneNumber); // invalid Nigeria number
    expect(() =>
      phoneNumberValidator.getValidNationalNumberForRegion(
        "+4348123456789",
        "NG"
      )
    ).toThrow(phoneNumberError.invalidPhoneNumber); // invalid Nigeria number
    expect(() =>
      phoneNumberValidator.getValidNationalNumberForRegion("8123456", "NG")
    ).toThrow(phoneNumberError.invalidPhoneNumber); // invalid Nigeria number
  });
});
