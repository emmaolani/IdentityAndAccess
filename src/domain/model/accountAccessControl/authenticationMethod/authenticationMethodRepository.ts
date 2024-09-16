import AuthenticationMethod from "./authenticationMethod";

interface AuthenticationMethodRepository {
  save(authenticationMethod: AuthenticationMethod): Promise<void>;
  getByType(type: string): Promise<AuthenticationMethod>;
  remove(id: string): Promise<void>;
}

export default AuthenticationMethodRepository;
