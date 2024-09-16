import AuthenticationMethodId from "../../../../src/domain/model/accountAccessControl/authenticationMethod/authenticationMethodId";
import Type from "../../../../src/domain/model/accountAccessControl/authenticationMethod/type";
import AuthenticationMethod from "../../../../src/domain/model/accountAccessControl/authenticationMethod/authenticationMethod";
import RestrictionId from "../../../../src/domain/model/accountAccessControl/restriction/restrictionId";
import Reason from "../../../../src/domain/model/accountAccessControl/restriction/reason";
import Restriction from "../../../../src/domain/model/accountAccessControl/restriction/restriction";
import FakeDb from "./fakeDb";

class PlaceHolderRepository {
  private db: FakeDb;
  static authenticationMethodProperties = {
    id: "550e8400-e29b-41d4-a716-446655440000",
    type: "password",
  };
  static restrictionProperties = {
    id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    reason: "awaiting profile creation",
  };

  constructor(aDb: FakeDb) {
    this.db = aDb;
  }

  savePlaceholders(anOption: option) {
    if (anOption.authenticationMethod) {
      this.db.save(this.createAuthenticationMethod());
    }
    if (anOption.restriction) {
      this.db.save(this.createRestriction());
    }
  }

  removePlaceholders() {
    this.db.remove(
      AuthenticationMethod,
      PlaceHolderRepository.authenticationMethodProperties.id
    );
    this.db.remove(
      AuthenticationMethod,
      PlaceHolderRepository.authenticationMethodProperties.type
    );

    this.db.remove(Restriction, PlaceHolderRepository.restrictionProperties.id);
    this.db.remove(
      Restriction,
      PlaceHolderRepository.restrictionProperties.reason
    );
  }

  private createAuthenticationMethod(): AuthenticationMethod {
    return new AuthenticationMethod(
      new AuthenticationMethodId(
        PlaceHolderRepository.authenticationMethodProperties.id
      ),
      new Type(PlaceHolderRepository.authenticationMethodProperties.type)
    );
  }

  private createRestriction(): Restriction {
    return new Restriction(
      new RestrictionId(PlaceHolderRepository.restrictionProperties.id),
      new Reason(PlaceHolderRepository.restrictionProperties.reason)
    );
  }
}

type option = {
  authenticationMethod: boolean;
  restriction: boolean;
};

export default PlaceHolderRepository;
