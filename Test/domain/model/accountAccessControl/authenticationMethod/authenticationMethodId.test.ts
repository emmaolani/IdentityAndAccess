import AuthenticationMethodId from "../../../../../src/domain/model/accountAccessControl/authenticationMethod/authenticationMethodId";
import { authenticationMethodIdError } from "../../../../../src/domain/enum/errorMsg/authenticationMethodErrorMsg";
import UUIDGenerator from "../../../../../src/port/adapters/controller/uUIDGenerator";

describe("AuthenticationId", () => {
  let authenticationMethodId: AuthenticationMethodId;

  it("should create a authenticationMethodId only if the argument is of UUID v4 format", () => {
    const id = new UUIDGenerator().generate();

    authenticationMethodId = new AuthenticationMethodId(id);

    assertThat_AuthenticationMethodId_propertiesIsEqualTo(id);
  });

  function assertThat_AuthenticationMethodId_propertiesIsEqualTo(anId: string) {
    expect(authenticationMethodId).toBeInstanceOf(AuthenticationMethodId);
    expect(authenticationMethodId["id"]).toBe(anId);
  }

  it("should throw an error if the argument is not UUID v4 format", () => {
    expect(() => {
      new AuthenticationMethodId("not a UUID");
    }).toThrow(authenticationMethodIdError.invalidUUID);
  });
});
