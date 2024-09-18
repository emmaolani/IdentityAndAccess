import AuthenticationMethod from "../../../../../src/domain/model/accountAccessControl/authenticationMethod/authenticationMethod";
import AuthenticationMethodId from "../../../../../src/domain/model/accountAccessControl/authenticationMethod/authenticationMethodId";
import Type from "../../../../../src/domain/model/accountAccessControl/authenticationMethod/type";
import UUIDGenerator from "../../../../../src/port/util/uUIDGenerator";

describe("AuthenticationMethod", () => {
  let authenticationMethod: AuthenticationMethod;

  it("should correctly create an instance of authenticationMethod", () => {
    const id = new UUIDGenerator().generate();
    const typeName = "password";
    authenticationMethod = new AuthenticationMethod(
      new AuthenticationMethodId(id),
      new Type(typeName)
    );

    assertThat_AuthenticationMethod_propertiesMatches(id, typeName);
  });

  function assertThat_AuthenticationMethod_propertiesMatches(
    id: string,
    typeName: string
  ) {
    expect(authenticationMethod).toBeInstanceOf(AuthenticationMethod);
    expect(authenticationMethod["id"]["id"]).toBe(id);
    expect(authenticationMethod["type"]["type"]).toBe(typeName);
  }

  it("should return Id", () => {
    authenticationMethod = new AuthenticationMethod(
      new AuthenticationMethodId(new UUIDGenerator().generate()),
      new Type("password")
    );

    expect(authenticationMethod.getId()).toBeInstanceOf(AuthenticationMethodId);
  });
});
