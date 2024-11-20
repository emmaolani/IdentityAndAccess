import PersistedValueObject from "../../persistedValueObject";
import { userAccountErrorMsg } from "./userAccountErrorMsg";

class UserAccountId extends PersistedValueObject {
  private id: string;
  private idRequirement =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  constructor(aValue: string) {
    super();
    this.setValue(aValue);
  }

  private setValue(aValue: string) {
    this.assertMatchesRegExp(
      aValue,
      this.idRequirement,
      userAccountErrorMsg.invalidUUID
    );

    this.id = aValue;
  }

  getId(): string {
    return this.id;
  }
}

export default UserAccountId;
