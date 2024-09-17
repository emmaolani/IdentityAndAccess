import ITUAndISOSpec from "../../../../src/domain/model/geographicEntities/ITUAndISOSpec";
import ITUAndISOSpecId from "../../../../src/domain/model/geographicEntities/ITUAndISOSpecId";
import UUIDGenerator from "../../../../src/port/adapters/controller/uUIDGenerator";

describe("ITUandISOSpecs", () => {
  it("should create an instance", () => {
    const iTUAndISOSpecId = new ITUAndISOSpecId(new UUIDGenerator().generate());
    const countryID: string = "countryID";
    const countryCode: string = "countryCode";
    const callingCode: string = "234";

    const ituAndIsoSpec: ITUAndISOSpec = new ITUAndISOSpec(
      iTUAndISOSpecId,
      countryID,
      countryCode,
      callingCode
    );

    assertThat_ITUAndISOSpec_properties_match(
      ituAndIsoSpec,
      iTUAndISOSpecId,
      countryID,
      countryCode,
      callingCode
    );
  });

  function assertThat_ITUAndISOSpec_properties_match(
    anITUAndISOSpec: ITUAndISOSpec,
    anITUAndISOSpecId: ITUAndISOSpecId,
    aCountryID: string,
    aCountryCode: string,
    aCallingCode: string
  ) {
    expect(anITUAndISOSpec).toBeInstanceOf(ITUAndISOSpec);
    expect(anITUAndISOSpec["id"]).toBe(anITUAndISOSpecId);
    expect(anITUAndISOSpec["countryID"]).toBe(aCountryID);
    expect(anITUAndISOSpec["countryCode"]).toBe(aCountryCode);
    expect(anITUAndISOSpec["callingCode"]).toBe(aCallingCode);
  }

  it("should get id", () => {
    const id = new UUIDGenerator().generate();
    const ituAndIsoSpec: ITUAndISOSpec = new ITUAndISOSpec(
      new ITUAndISOSpecId(id),
      "countryID",
      "countryCode",
      "234"
    );

    expect(ituAndIsoSpec.getId()).toBe(id);
  });

  it("should get complete phone number", () => {
    const ituAndIsoSpec: ITUAndISOSpec = new ITUAndISOSpec(
      new ITUAndISOSpecId(new UUIDGenerator().generate()),
      "countryID",
      "countryCode",
      "234"
    );

    expect(ituAndIsoSpec.getCompletePhoneNumber("12345678")).toBe(
      "+23412345678"
    );
  });
});
