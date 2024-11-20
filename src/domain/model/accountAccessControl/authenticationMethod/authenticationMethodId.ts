import PersistedValueObject from "../../../persistedValueObject";
import { authenticationMethodErrorMsg } from "./authenticationMethodErrorMsg";

class AuthenticationMethodId extends PersistedValueObject {
  private id: string;
  private idRequirement =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  constructor(anId: string) {
    super();
    this.setId(anId);
  }

  private setId(anId: string) {
    this.assertMatchesRegExp(
      anId,
      this.idRequirement,
      authenticationMethodErrorMsg.invalidUUID
    );

    this.id = anId;
  }

  getId(): string {
    return this.id;
  }
}

export default AuthenticationMethodId;
