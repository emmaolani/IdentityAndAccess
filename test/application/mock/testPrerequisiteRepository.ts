import TestPrerequisiteData from "./testPrerequisiteData";
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
        case "passwordAuthenticationMethod":
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
        case "passwordAuthenticationMethod":
          this.db.remove(
            AuthenticationMethod,
            TestPrerequisiteData.passwordAuthenticationMethodProperties.id
          );
          this.db.remove(
            AuthenticationMethod,
            TestPrerequisiteData.passwordAuthenticationMethodProperties.type
          );
          break;
        case "restriction":
          this.db.remove(
            Restriction,
            TestPrerequisiteData.restrictionProperties.id
          );
          this.db.remove(
            Restriction,
            TestPrerequisiteData.restrictionProperties.reason
          );
        case "userAccount":
          this.db.remove(
            UserAccount,
            TestPrerequisiteData.userAccountProperties.id
          );
          this.db.remove(
            UserAccount,
            TestPrerequisiteData.userAccountProperties.username
          );
          break;
        case "userAccountProfile":
          this.db.remove(
            UserAccountProfile,
            TestPrerequisiteData.userAccountProfileProperties.id
          );
          this.db.remove(
            UserAccountProfile,
            TestPrerequisiteData.userAccountProperties.id
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
        TestPrerequisiteData.passwordAuthenticationMethodProperties.id
      ),
      TestPrerequisiteData.passwordAuthenticationMethodProperties.type
    );
  }

  private createRestriction(): Restriction {
    return new Restriction(
      new RestrictionId(TestPrerequisiteData.restrictionProperties.id),
      TestPrerequisiteData.restrictionProperties.reason
    );
  }

  private createUserAccount(): UserAccount {
    return new UserAccount(
      new UserAccountId(TestPrerequisiteData.userAccountProperties.id),
      [
        new AuthenticationMethodId(
          TestPrerequisiteData.passwordAuthenticationMethodProperties.id
        ),
      ],
      new RestrictionId(TestPrerequisiteData.restrictionProperties.id),
      new UserName(TestPrerequisiteData.userAccountProperties.username),
      new Password(TestPrerequisiteData.userAccountProperties.password)
    );
  }

  private createITUAndISOSpecification() {
    return new ITUAndISOSpec(
      new ITUAndISOSpecId(
        TestPrerequisiteData.ITUAndISOSpecificationProperties.id
      ),
      TestPrerequisiteData.ITUAndISOSpecificationProperties.countryId,
      TestPrerequisiteData.ITUAndISOSpecificationProperties.countryCode,
      TestPrerequisiteData.ITUAndISOSpecificationProperties.callingCode
    );
  }

  private createUserAccountProfile() {
    return new UserAccountProfile(
      new UserAccountProfileId(
        TestPrerequisiteData.userAccountProfileProperties.id
      ),
      new UserAccountId(TestPrerequisiteData.userAccountProperties.id),
      new EmailAddress(
        TestPrerequisiteData.userAccountProfileProperties.email,
        false,
        null
      ),
      new PhoneNumber(
        TestPrerequisiteData.userAccountProfileProperties.phone,
        new ITUAndISOSpecId(
          TestPrerequisiteData.ITUAndISOSpecificationProperties.id
        ),
        false,
        null
      )
    );
  }

  private setPlaceHolderList() {
    this.listOfAllPrerequisiteObjects = [
      "passwordAuthenticationMethod",
      "restriction",
      "userAccount",
      "ITUAndISOSpec",
      "userAccountProfile",
    ];
  }
}

type prerequisiteObjects =
  | "passwordAuthenticationMethod"
  | "restriction"
  | "userAccount"
  | "ITUAndISOSpec"
  | "userAccountProfile"
  | "ALL";

export { TestPrerequisiteRepository, prerequisiteObjects };
