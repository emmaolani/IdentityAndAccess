import UserAccountRepository from "../model/identity/userAccount/userAccountRepository";
import EventStore from "../eventStore";
import ITUAndISOSpecRepository from "../model/geographicEntities/ITUAndISOSpecRepository";
import UserAccountProfileRepository from "../model/identity/userAccount/userAccountProfile/userAccountProfileRepository";

type RepositoryName =
  | "userAccount"
  | "eventStore"
  | "ITUAndISO"
  | "userAccountProfile";

// Define the return type for the factory method
type RepositoryCollection<T extends RepositoryName[]> = {
  [K in T[number]]: K extends "userAccount"
    ? UserAccountRepository
    : K extends "eventStore"
    ? EventStore
    : K extends "ITUAndISO"
    ? ITUAndISOSpecRepository
    : K extends "userAccountProfile"
    ? UserAccountProfileRepository
    : never;
};

export { RepositoryCollection, RepositoryName };
