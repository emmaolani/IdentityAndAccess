import PersistedValueObject from "../../persistedValueObject";
import { ITUAndISOSpecIdErrorMsg } from "./iTUAndISOErrorMsg";

class ITUAndISOSpecId extends PersistedValueObject {
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
      ITUAndISOSpecIdErrorMsg.invalidUUID
    );

    this.id = anId;
  }

  getId(): string {
    return this.id;
  }
}

export default ITUAndISOSpecId;
