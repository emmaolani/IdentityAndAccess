import Type from "../../../../../src/domain/model/accountAccessControl/authenticationMethod/type";
import { typeError } from "../../../../../src/domain/enum/errorMsg/authenticationMethodErrorMsg";

describe("Type", () => {
  let type: Type;

  it("should correctly create an instance of Type", () => {
    type = new Type("password");

    assertThat_type_propertiesMatch("password");
  });

  function assertThat_type_propertiesMatch(aName: string) {
    expect(type).toBeInstanceOf(Type);
    expect(type["type"]).toBe(aName);
  }

  it("should throw an error if the method name is an empty string", () => {
    expect(() => {
      new Type("");
    }).toThrow(typeError.invalidType);

    expect(() => {
      new Type("     ");
    }).toThrow(typeError.invalidType);
  });
});