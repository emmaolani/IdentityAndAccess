import ITUandISOSpecsDud from "../../mock/ituAndIsoSpecsMock";
import PhoneNumber from "../../../../src/domain/model/PersonalInfo/phoneNumber";

describe("ITUandISOSpecs", () => {
  let id: string = "id";
  let countryID: string = "countryID";
  let countryCode: string = "countryCode";
  let callingCode: string = "234";
  let ituAndIsoSpec: ITUandISOSpecsDud = new ITUandISOSpecsDud(
    id,
    countryID,
    countryCode,
    callingCode
  );

  it("should create an instance", () => {
    expect(ituAndIsoSpec).toBeTruthy();
  });

  it("should return the correct data", () => {
    expect(ituAndIsoSpec.Data()).toEqual({
      id: id,
      countryID: countryID,
      countryCode: countryCode,
      callingCode: callingCode,
    });
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
