import UserAccountProfile from "./userAccountProfile";

interface UserAccountProfileRepository {
  save(userAccountProfile: UserAccountProfile): Promise<void>;
}

export default UserAccountProfileRepository;
