import UserAccountRepository from "../model/identity/userAccount/userAccountRepository";
import EventStore from "../eventStore";
import ITUAndISOSpecRepository from "../model/geographicEntities/ITUAndISOSpecRepository";
import UserAccountProfileRepository from "../model/identity/userAccount/userAccountProfile/userAccountProfileRepository";

type RepositoryName =
  | "UserAccountRepository"
  | "EventStore"
  | "ITUAndISOSpecRepository"
  | "UserAccountProfileRepository";

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
    : never;
};

export { RepositoryCollection, RepositoryName };
