import AuthenticationMethod from "../../../src/domain/model/accountAccessControl/authenticationMethod/authenticationMethod";
import AuthenticationMethodRepository from "../../../src/domain/model/accountAccessControl/authenticationMethod/authenticationMethodRepository";
import { authenticationMethodRepoErrorMsg } from "../../../src/port/_enums/errorMsg/repositoryErrorMsg/authenticationMethodErrorMsg";
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

  async getByType(type: string): Promise<AuthenticationMethod> {
    const data = this.db.find(AuthenticationMethod, type);

    if (data instanceof AuthenticationMethod) {
      return data;
    }

    throw Error(authenticationMethodRepoErrorMsg.notFound);
  }

  async remove(anId: string): Promise<void> {
    this.db.remove(AuthenticationMethod, anId);
  }
}

export default AuthenticationMethodRepositoryMock;
