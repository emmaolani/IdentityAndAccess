import AuthenticationMethodId from "../../../../src/domain/model/accountAccessControl/authenticationMethod/authenticationMethodId";
import Type from "../../../../src/domain/model/accountAccessControl/authenticationMethod/type";
import AuthenticationMethod from "../../../../src/domain/model/accountAccessControl/authenticationMethod/authenticationMethod";
import RestrictionId from "../../../../src/domain/model/accountAccessControl/restriction/restrictionId";
import Reason from "../../../../src/domain/model/accountAccessControl/restriction/reason";
import Restriction from "../../../../src/domain/model/accountAccessControl/restriction/restriction";
import FakeDb from "./fakeDb";
import UserAccount from "../../../../src/domain/model/userAccount/userAccount";
import UserAccountId from "../../../../src/domain/model/userAccount/userAccountId";
import UserName from "../../../../src/domain/model/userAccount/userName";
import Password from "../../../../src/domain/model/userAccount/password";

class PlaceHolderRepository {
  private db: FakeDb;
  private listOfAllPlaceHolders: placeholders[];
  static authenticationMethodProperties = {
    id: "550e8400-e29b-41d4-a716-446655440000",
    type: "password",
  };
  static restrictionProperties = {
    id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    reason: "awaiting profile creation",
  };
  static userAccountProperties = {
    id: "e47ac10b-58cc-4372-a567-0e02b2c3d406",
    username: "username",
    password: "123Emm@oaa",
  };

  constructor(aDb: FakeDb) {
    this.db = aDb;
    this.setPlaceHolderList();
  }

  savePlaceholders(...options: placeholders[]) {
    if (options.includes("ALL") && options.length == 1) {
      console.log("problem", options);
      this.saveSpecifiedPlaceHolders(this.listOfAllPlaceHolders);
    } else {
      this.saveSpecifiedPlaceHolders(options);
    }
  }

  private saveSpecifiedPlaceHolders(options: placeholders[]) {
    options.forEach((option) => {
      switch (option) {
        case "authenticationMethod":
          this.db.save(this.createAuthenticationMethod());
          break;
        case "restriction":
          this.db.save(this.createRestriction());
          break;
        case "userAccount":
          this.db.save(this.createUserAccount());
          break;
        default:
          break;
      }
    });
  }

  removePlaceholders(...options: placeholders[]) {
    if (options.includes("ALL") && options.length === 0) {
      this.removeSpecifiedPlaceHolders(this.listOfAllPlaceHolders);
    } else {
      this.removeSpecifiedPlaceHolders(options);
    }
  }

  private removeSpecifiedPlaceHolders(options: placeholders[]) {
    options.forEach((option) => {
      switch (option) {
        case "authenticationMethod":
          this.db.remove(
            AuthenticationMethod,
            PlaceHolderRepository.authenticationMethodProperties.id
          );
          this.db.remove(
            AuthenticationMethod,
            PlaceHolderRepository.authenticationMethodProperties.type
          );
          break;
        case "restriction":
          this.db.remove(
            Restriction,
            PlaceHolderRepository.restrictionProperties.id
          );
          this.db.remove(
            Restriction,
            PlaceHolderRepository.restrictionProperties.reason
          );
        case "userAccount":
          this.db.remove(
            UserAccount,
            PlaceHolderRepository.userAccountProperties.id
          );
          this.db.remove(
            UserAccount,
            PlaceHolderRepository.userAccountProperties.username
          );
        default:
          break;
      }
    });
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

  private createUserAccount(): UserAccount {
    return new UserAccount(
      new UserAccountId(PlaceHolderRepository.userAccountProperties.id),
      new AuthenticationMethodId(
        PlaceHolderRepository.authenticationMethodProperties.id
      ),
      new RestrictionId(PlaceHolderRepository.restrictionProperties.id),
      new UserName(PlaceHolderRepository.userAccountProperties.username),
      new Password(PlaceHolderRepository.userAccountProperties.password)
    );
  }
  private setPlaceHolderList() {
    this.listOfAllPlaceHolders = [
      "authenticationMethod",
      "restriction",
      "userAccount",
    ];
  }
}

type placeholders =
  | "authenticationMethod"
  | "restriction"
  | "userAccount"
  | "ALL";

export default PlaceHolderRepository;
