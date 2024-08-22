import DomainEventPublisher from "../../domainEventPublisher";
import UserAccount from "./userAccount";
import UserName from "./userName";
import Password from "./password";

class UserAccountCreationService {
  getNewUserAccountAndPublishEvent(
    username: string,
    password: string,
    email: string,
    phoneNumber: string,
    firstName: string,
    lastName: string,
    birthDate: string,
    country: string,
    state: string,
    domainEventPublisher: DomainEventPublisher
  ) {
    const userName = new UserName(username);
    const userPassword = new Password(password);
    const userAccount = new UserAccount("id", userName, userPassword, true);
  }
}

export default UserAccountCreationService;
