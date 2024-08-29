import UserAccountRepository from "../model/identity/userAccount/userAccountRepository";
import EventStore from "../eventStore";

type RepositoryName = "userAccount" | "eventStore";

// Define the return type for the factory method
type RepositoryCollection<T extends RepositoryName[]> = {
  [K in T[number]]: K extends "userAccount"
    ? UserAccountRepository
    : K extends "eventStore"
    ? EventStore
    : never;
};

export { RepositoryCollection, RepositoryName };
