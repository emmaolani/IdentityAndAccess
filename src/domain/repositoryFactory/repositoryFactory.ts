import { RepositoryName, RepositoryCollection } from "./repositoryFactory.type";

interface RepositoryFactory {
  getRepositories<T extends RepositoryName[]>(
    ...repos: T
  ): RepositoryCollection<T>;
}

export default RepositoryFactory;
