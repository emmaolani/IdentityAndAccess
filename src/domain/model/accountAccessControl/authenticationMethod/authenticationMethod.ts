import AuthenticationMethodId from "./authenticationMethodId";
import Type from "./type";

class AuthenticationMethod {
  private id: AuthenticationMethodId;
  private type: Type;

  constructor(anId: AuthenticationMethodId, aType: Type) {
    this.setId(anId);
    this.setType(aType);
  }

  private setId(anId: AuthenticationMethodId): void {
    this.id = anId;
  }

  private setType(aType: Type): void {
    this.type = aType;
  }

  getId() {
    return this.id;
  }
}

export default AuthenticationMethod;
