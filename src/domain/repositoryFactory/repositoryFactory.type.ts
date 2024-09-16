import UserAccountRepository from "../model/userAccount/userAccountRepository";
import EventStore from "../eventStore";
import ITUAndISOSpecRepository from "../model/geographicEntities/ITUAndISOSpecRepository";
import UserAccountProfileRepository from "../model/userAccount/userAccountProfile/userAccountProfileRepository";
import AuthenticationMethodRepository from "../model/accountAccessControl/authenticationMethod/authenticationMethodRepository";
import RestrictionRepository from "../model/accountAccessControl/restriction/restrictionRepository";

type RepositoryName =
  | "UserAccountRepository"
  | "EventStore"
  | "ITUAndISOSpecRepository"
  | "UserAccountProfileRepository"
  | "AuthenticationMethodRepository"
  | "RestrictionRepository";

// Define the return type for the factory method
type RepositoryCollection<T extends RepositoryName[]> = {
  [K in T[number]]: K extends "UserAccountRepository"
    ? UserAccountRepository
    : K extends "EventStore"
    ? EventStore
    : K extends "ITUAndISOSpecRepository"
    ? ITUAndISOSpecRepository
    : K extends "UserAccountProfileRepository"
    ? UserAccountProfileRepository
    : K extends "AuthenticationMethodRepository"
    ? AuthenticationMethodRepository
    : K extends "RestrictionRepository"
    ? RestrictionRepository
    : never;
};

export { RepositoryCollection, RepositoryName };
