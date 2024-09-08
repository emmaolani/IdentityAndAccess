import DomainEvent from "../../../../src/domain/domainEvent";
import EventStore from "../../../../src/domain/eventStore";
import ITUAndISOSpec from "../../../../src/domain/model/geographicEntities/ITUAndISOSpec";
import NewUserAccountCreated from "../../../../src/domain/model/identity/userAccount/newUserAccountCreated";
import UserAccount from "../../../../src/domain/model/identity/userAccount/userAccount";
import NewUserAccountProfileCreated from "../../../../src/domain/model/identity/userAccount/userAccountProfile/newUserAccountProfileCreated";
import UserAccountProfile from "../../../../src/domain/model/identity/userAccount/userAccountProfile/userAccountProfile";
import StoredEvent from "../storedEvents";

type Schema =
  | UserAccountProfile
  | ITUAndISOSpec
  | UserAccount
  | NewUserAccountCreated
  | NewUserAccountProfileCreated
  | StoredEvent;

type ClassSchema =
  | typeof UserAccountProfile
  | typeof ITUAndISOSpec
  | typeof UserAccount
  | typeof NewUserAccountCreated
  | typeof NewUserAccountProfileCreated
  | typeof StoredEvent;

export { Schema, ClassSchema };
