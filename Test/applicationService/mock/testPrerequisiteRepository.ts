import AuthenticationMethodId from "../../../src/domain/model/accountAccessControl/authenticationMethod/authenticationMethodId";
import Type from "../../../src/domain/model/accountAccessControl/authenticationMethod/type";
import AuthenticationMethod from "../../../src/domain/model/accountAccessControl/authenticationMethod/authenticationMethod";
import RestrictionId from "../../../src/domain/model/accountAccessControl/restriction/restrictionId";
import Reason from "../../../src/domain/model/accountAccessControl/restriction/reason";
import Restriction from "../../../src/domain/model/accountAccessControl/restriction/restriction";
import FakeDb from "./fakeDb/fakeDb";
import UserAccount from "../../../src/domain/model/userAccount/userAccount";
import UserAccountId from "../../../src/domain/model/userAccount/userAccountId";
import UserName from "../../../src/domain/model/userAccount/userName";
import Password from "../../../src/domain/model/userAccount/password";

class TestPrerequisiteRepository {
  private db: FakeDb;
  private listOfAllPlaceHolders: prerequisiteObjects[];
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

  savePrerequisiteObjects(...objects: prerequisiteObjects[]) {
    if (objects.includes("ALL") && objects.length == 1) {
      this.saveObjectsSpecified(this.listOfAllPlaceHolders);
    } else {
      this.saveObjectsSpecified(objects);
    }
  }

  private saveObjectsSpecified(objects: prerequisiteObjects[]) {
    objects.forEach((object) => {
      switch (object) {
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

  removePrerequisiteObjects(...objects: prerequisiteObjects[]) {
    if (objects.includes("ALL") && objects.length === 0) {
      this.removeObjectsSpecified(this.listOfAllPlaceHolders);
    } else {
      this.removeObjectsSpecified(objects);
    }
  }

  private removeObjectsSpecified(objects: prerequisiteObjects[]) {
    objects.forEach((object) => {
      switch (object) {
        case "authenticationMethod":
          this.db.remove(
            AuthenticationMethod,
            TestPrerequisiteRepository.authenticationMethodProperties.id
          );
          this.db.remove(
            AuthenticationMethod,
            TestPrerequisiteRepository.authenticationMethodProperties.type
          );
          break;
        case "restriction":
          this.db.remove(
            Restriction,
            TestPrerequisiteRepository.restrictionProperties.id
          );
          this.db.remove(
            Restriction,
            TestPrerequisiteRepository.restrictionProperties.reason
          );
        case "userAccount":
          this.db.remove(
            UserAccount,
            TestPrerequisiteRepository.userAccountProperties.id
          );
          this.db.remove(
            UserAccount,
            TestPrerequisiteRepository.userAccountProperties.username
          );
        default:
          break;
      }
    });
  }

  private createAuthenticationMethod(): AuthenticationMethod {
    return new AuthenticationMethod(
      new AuthenticationMethodId(
        TestPrerequisiteRepository.authenticationMethodProperties.id
      ),
      new Type(TestPrerequisiteRepository.authenticationMethodProperties.type)
    );
  }

  private createRestriction(): Restriction {
    return new Restriction(
      new RestrictionId(TestPrerequisiteRepository.restrictionProperties.id),
      new Reason(TestPrerequisiteRepository.restrictionProperties.reason)
    );
  }

  private createUserAccount(): UserAccount {
    return new UserAccount(
      new UserAccountId(TestPrerequisiteRepository.userAccountProperties.id),
      new AuthenticationMethodId(
        TestPrerequisiteRepository.authenticationMethodProperties.id
      ),
      new RestrictionId(TestPrerequisiteRepository.restrictionProperties.id),
      new UserName(TestPrerequisiteRepository.userAccountProperties.username),
      new Password(TestPrerequisiteRepository.userAccountProperties.password)
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

type prerequisiteObjects =
  | "authenticationMethod"
  | "restriction"
  | "userAccount"
  | "ALL";

export default TestPrerequisiteRepository;
