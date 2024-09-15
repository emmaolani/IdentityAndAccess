import RestrictionId from "./restrictionId";
import Reason from "./reason";

class Restriction {
  private id: RestrictionId;
  private reason: Reason;

  constructor(anId: RestrictionId, aReason: Reason) {
    this.setId(anId);
    this.setReason(aReason);
  }

  setId(anId: RestrictionId): void {
    this.id = anId;
  }

  setReason(aReason: Reason): void {
    this.reason = aReason;
  }

  getId() {
    return this.id;
  }
}

export default Restriction;
