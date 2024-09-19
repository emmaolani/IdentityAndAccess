import AssertionConcern from "../../../assertionConcern";
import { restrictionErrorMsg } from "./restrictionErrorMsg";
import RestrictionId from "./restrictionId";

class Restriction extends AssertionConcern {
  private id: RestrictionId;
  private reason: string;

  constructor(anId: RestrictionId, aReason: string) {
    super();
    this.setId(anId);
    this.setReason(aReason);
  }

  setId(anId: RestrictionId): void {
    this.id = anId;
  }

  setReason(aReason: string): void {
    this.assertNotNull(aReason, restrictionErrorMsg.invalidReason);
    this.assertLengthIsCorrect(
      aReason,
      1,
      60,
      restrictionErrorMsg.invalidReason
    );

    this.reason = aReason;
  }

  getId() {
    return this.id;
  }
}

export default Restriction;
