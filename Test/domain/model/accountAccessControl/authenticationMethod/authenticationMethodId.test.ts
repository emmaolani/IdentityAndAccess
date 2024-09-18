import AuthenticationMethodId from "../../../../../src/domain/model/accountAccessControl/authenticationMethod/authenticationMethodId";
import { authenticationMethodErrorMsg } from "../../../../../src/domain/model/accountAccessControl/authenticationMethod/authenticationMethodErrorMsg";
import UUIDGenerator from "../../../../../src/port/util/uUIDGenerator";

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
    }).toThrow(authenticationMethodErrorMsg.invalidUUID);
  });
});
