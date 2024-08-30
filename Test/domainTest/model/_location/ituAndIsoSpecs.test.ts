import ITUandISOSpecs from "../../../../src/domain/model/_location/ituAndIsoSpecs";
import PhoneNumber from "../../../../src/domain/model/contactDetails/phoneNumber";

describe("ITUandISOSpecs", () => {
  let id: string = "id";
  let countryID: string = "countryID";
  let countryCode: string = "countryCode";
  let callingCode: string = "234";
  let ituAndIsoSpec: ITUandISOSpecs = new ITUandISOSpecs(
    id,
    countryID,
    countryCode,
    callingCode
  );

  it("should create an instance", () => {
    expect(ituAndIsoSpec).toBeInstanceOf(ITUandISOSpecs);
  });

  it("should create a phone number", () => {
    expect(ituAndIsoSpec.newPhoneNumber("12345678")).toBeInstanceOf(
      PhoneNumber
    );
  });

  it("should get complete phone number", () => {
    expect(ituAndIsoSpec.getCompletePhoneNumber("12345678")).toBe(
      "+23412345678"
    );
  });
});
