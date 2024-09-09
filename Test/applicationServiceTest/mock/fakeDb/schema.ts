import ITUAndISOSpec from "../../../../src/domain/model/geographicEntities/ITUAndISOSpec";
import UserAccount from "../../../../src/domain/model/identity/userAccount/userAccount";
import UserAccountProfile from "../../../../src/domain/model/identity/userAccount/userAccountProfile/userAccountProfile";
import StoredEventMock from "../storedEventMock";

type Instance =
  | UserAccountProfile
  | ITUAndISOSpec
  | UserAccount
  | StoredEventMock;

type Class =
  | typeof UserAccountProfile
  | typeof ITUAndISOSpec
  | typeof UserAccount
  | typeof StoredEventMock;

export { Instance, Class };
