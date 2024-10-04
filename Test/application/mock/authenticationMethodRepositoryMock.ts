import AuthenticationMethod from "../../../src/domain/model/accountAccessControl/authenticationMethod/authenticationMethod";
import AuthenticationMethodRepository from "../../../src/domain/model/accountAccessControl/authenticationMethod/authenticationMethodRepository";
import { authenticationMethodRepoErrorMsg } from "../../../src/port/adapters/persistance/repositoryErrorMsg/authenticationMethodErrorMsg";
import FakeDb from "./fakeDb/fakeDb";

class AuthenticationMethodRepositoryMock
  implements AuthenticationMethodRepository
{
  private db: FakeDb;

  constructor(aDb: FakeDb) {
    this.db = aDb;
  }

  async save(aAuthenticationMethod: AuthenticationMethod): Promise<void> {
    this.db.save(aAuthenticationMethod);
  }

  async getByType(methodType: string): Promise<AuthenticationMethod> {
    const authenticationMethod = this.db.find(AuthenticationMethod, methodType);

    if (authenticationMethod instanceof AuthenticationMethod) {
      return authenticationMethod;
    }

    throw Error(authenticationMethodRepoErrorMsg.notFound);
  }

  async getAllByType(types: string[]): Promise<AuthenticationMethod[]> {
    let authenticationMethods: AuthenticationMethod[] = [];

    types.forEach((type) => {
      const authenticationMethod = this.db.find(AuthenticationMethod, type);

      if (authenticationMethod instanceof AuthenticationMethod) {
        authenticationMethods.push(authenticationMethod);
      }

      throw Error(authenticationMethodRepoErrorMsg.notFound);
    });

    return authenticationMethods;
  }

  async remove(anId: string): Promise<void> {
    this.db.remove(AuthenticationMethod, anId);
  }
}

export default AuthenticationMethodRepositoryMock;
