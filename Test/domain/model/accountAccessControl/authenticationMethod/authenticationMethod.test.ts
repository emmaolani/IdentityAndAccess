import AuthenticationMethod from "../../../../../src/domain/model/accountAccessControl/authenticationMethod/authenticationMethod";
import { authenticationMethodErrorMsg } from "../../../../../src/domain/model/accountAccessControl/authenticationMethod/authenticationMethodErrorMsg";
import AuthenticationMethodId from "../../../../../src/domain/model/accountAccessControl/authenticationMethod/authenticationMethodId";
import UUIDGenerator from "../../../../../src/port/util/uUIDGenerator";

describe("AuthenticationMethod", () => {
  let authenticationMethod: AuthenticationMethod;

  it("should correctly create an instance of authenticationMethod", () => {
    const id = new UUIDGenerator().generate();
    const typeName = "password";
    authenticationMethod = new AuthenticationMethod(
      new AuthenticationMethodId(id),
      "password"
    );

    assertThat_AuthenticationMethod_propertiesMatches(id, typeName);
  });

  function assertThat_AuthenticationMethod_propertiesMatches(
    id: string,
    typeName: string
  ) {
    expect(authenticationMethod).toBeInstanceOf(AuthenticationMethod);
    expect(authenticationMethod["id"]["id"]).toBe(id);
    expect(authenticationMethod["type"]).toBe(typeName);
  }

  it("should throw error if type is an empty string", () => {
    expect(() => {
      new AuthenticationMethod(
        new AuthenticationMethodId(new UUIDGenerator().generate()),
        ""
      );
    }).toThrow(authenticationMethodErrorMsg.invalidType);
    expect(() => {
      new AuthenticationMethod(
        new AuthenticationMethodId(new UUIDGenerator().generate()),
        "     "
      );
    }).toThrow(authenticationMethodErrorMsg.invalidType);
  });

  it("should return Id", () => {
    authenticationMethod = new AuthenticationMethod(
      new AuthenticationMethodId(new UUIDGenerator().generate()),
      "password"
    );

    expect(authenticationMethod.getId()).toBeInstanceOf(AuthenticationMethodId);
  });
});
