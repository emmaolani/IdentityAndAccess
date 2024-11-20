import AssertionConcern from "../../../assertionConcern";
import { authenticationMethodErrorMsg } from "./authenticationMethodErrorMsg";
import AuthenticationMethodId from "./authenticationMethodId";

class AuthenticationMethod extends AssertionConcern {
  private id: AuthenticationMethodId;
  private type: string;

  constructor(anId: AuthenticationMethodId, aType: string) {
    super();
    this.setId(anId);
    this.setType(aType);
  }

  private setId(anId: AuthenticationMethodId): void {
    this.id = anId;
  }

  private setType(aType: string): void {
    this.assertNotNull(aType, authenticationMethodErrorMsg.invalidType);
    this.assertLengthIsCorrect(
      aType,
      1,
      15,
      authenticationMethodErrorMsg.invalidType
    );

    this.type = aType;
  }

  getId() {
    return this.id;
  }
}

export default AuthenticationMethod;
