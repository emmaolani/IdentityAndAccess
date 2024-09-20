import AuthenticationMethodId from "../../../src/domain/model/accountAccessControl/authenticationMethod/authenticationMethodId";
import AuthenticationMethod from "../../../src/domain/model/accountAccessControl/authenticationMethod/authenticationMethod";
import RestrictionId from "../../../src/domain/model/accountAccessControl/restriction/restrictionId";
import Restriction from "../../../src/domain/model/accountAccessControl/restriction/restriction";
import FakeDb from "./fakeDb/fakeDb";
import UserAccount from "../../../src/domain/model/userAccount/userAccount";
import UserAccountId from "../../../src/domain/model/userAccount/userAccountId";
import UserName from "../../../src/domain/model/userAccount/userName";
import Password from "../../../src/domain/model/userAccount/password";
import ITUAndISOSpec from "../../../src/domain/model/geographicEntities/ITUAndISOSpec";
import ITUAndISOSpecId from "../../../src/domain/model/geographicEntities/ITUAndISOSpecId";
import UserAccountProfile from "../../../src/domain/model/userAccount/userAccountProfile/userAccountProfile";
import UserAccountProfileId from "../../../src/domain/model/userAccount/userAccountProfile/userAccountProfileId";
import EmailAddress from "../../../src/domain/model/contactDetails/emailAddress";
import PhoneNumber from "../../../src/domain/model/contactDetails/phoneNumber";

class TestPrerequisiteRepository {
  private db: FakeDb;
  private listOfAllPrerequisiteObjects: prerequisiteObjects[];
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
  static ITUAndISOSpecificationProperties = {
    id: "f47bc10b-58cc-4392-a567-0e02b2c3d606",
    countryId: "id",
    countryCode: "NG",
    callingCode: "234",
  };
  static userAccountProfileProperties = {
    id: "c69bc10b-58cc-4392-a567-0e02b2b3d606",
    email: "test@tester.com",
    phone: "8127456800",
  };

  constructor(aDb: FakeDb) {
    this.db = aDb;
    this.setPlaceHolderList();
  }

  savePrerequisiteObjects(...objects: prerequisiteObjects[]) {
    if (objects.includes("ALL") && objects.length == 1) {
      this.saveObjectsSpecified(this.listOfAllPrerequisiteObjects);
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
        case "ITUAndISOSpec":
          this.db.save(this.createITUAndISOSpecification());
          break;
        case "userAccountProfile":
          this.db.save(this.createUserAccountProfile());
          break;
        default:
          break;
      }
    });
  }

  removePrerequisiteObjects(...objects: prerequisiteObjects[]) {
    if (objects.includes("ALL") && objects.length === 0) {
      this.removeObjectsSpecified(this.listOfAllPrerequisiteObjects);
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
          break;
        case "userAccountProfile":
          this.db.remove(
            UserAccountProfile,
            TestPrerequisiteRepository.userAccountProfileProperties.id
          );
          this.db.remove(
            UserAccountProfile,
            TestPrerequisiteRepository.userAccountProperties.id
          );
          break;
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
      TestPrerequisiteRepository.authenticationMethodProperties.type
    );
  }

  private createRestriction(): Restriction {
    return new Restriction(
      new RestrictionId(TestPrerequisiteRepository.restrictionProperties.id),
      TestPrerequisiteRepository.restrictionProperties.reason
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

  private createITUAndISOSpecification() {
    return new ITUAndISOSpec(
      new ITUAndISOSpecId(
        TestPrerequisiteRepository.ITUAndISOSpecificationProperties.id
      ),
      TestPrerequisiteRepository.ITUAndISOSpecificationProperties.countryId,
      TestPrerequisiteRepository.ITUAndISOSpecificationProperties.countryCode,
      TestPrerequisiteRepository.ITUAndISOSpecificationProperties.callingCode
    );
  }

  private createUserAccountProfile() {
    return new UserAccountProfile(
      new UserAccountProfileId(
        TestPrerequisiteRepository.userAccountProfileProperties.id
      ),
      new UserAccountId(TestPrerequisiteRepository.userAccountProperties.id),
      new EmailAddress(
        TestPrerequisiteRepository.userAccountProfileProperties.email,
        false,
        null
      ),
      new PhoneNumber(
        TestPrerequisiteRepository.userAccountProfileProperties.phone,
        new ITUAndISOSpecId(
          TestPrerequisiteRepository.ITUAndISOSpecificationProperties.id
        ),
        false,
        null
      )
    );
  }

  private setPlaceHolderList() {
    this.listOfAllPrerequisiteObjects = [
      "authenticationMethod",
      "restriction",
      "userAccount",
      "ITUAndISOSpec",
      "userAccountProfile",
    ];
  }
}

type prerequisiteObjects =
  | "authenticationMethod"
  | "restriction"
  | "userAccount"
  | "ITUAndISOSpec"
  | "userAccountProfile"
  | "ALL";

export { TestPrerequisiteRepository, prerequisiteObjects };
