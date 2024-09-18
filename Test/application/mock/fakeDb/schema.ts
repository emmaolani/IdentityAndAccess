import ITUAndISOSpec from "../../../../src/domain/model/geographicEntities/ITUAndISOSpec";
import UserAccount from "../../../../src/domain/model/userAccount/userAccount";
import UserAccountProfile from "../../../../src/domain/model/userAccount/userAccountProfile/userAccountProfile";
import AuthenticationMethod from "../../../../src/domain/model/accountAccessControl/authenticationMethod/authenticationMethod";
import Restriction from "../../../../src/domain/model/accountAccessControl/restriction/restriction";
import StoredEventMock from "../storedEventMock";

type Instance =
  | UserAccountProfile
  | ITUAndISOSpec
  | UserAccount
  | AuthenticationMethod
  | Restriction
  | StoredEventMock;

type Class =
  | typeof UserAccountProfile
  | typeof ITUAndISOSpec
  | typeof UserAccount
  | typeof AuthenticationMethod
  | typeof Restriction
  | typeof StoredEventMock;

export { Instance, Class };
