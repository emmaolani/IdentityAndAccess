import Address from "../../../../../../src/domain/model/organization/workAccount/workAccountProfile/address";

describe("address", () => {
  let countryId: string = "countryID";
  let stateId: string = "stateID";

  it("should return users country and address ids when required", () => {
    const address: Address = new Address(countryId, stateId);

    const { addressCountryId, addressStateId } = address.getAddress();

    expect(addressCountryId).toBe("countryID");
    expect(addressStateId).toBe("stateID");
  });
});
