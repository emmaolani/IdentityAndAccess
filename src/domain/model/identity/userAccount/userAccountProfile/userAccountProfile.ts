import UserAccountId from "../userAccountId";
import UserAccountProfileId from "./userAccountProfileId";
import EmailAddress from "../../../contactDetails/emailAddress";
import PhoneNumber from "../../../contactDetails/phoneNumber";
import DomainEventPublisher from "../../../../domainEventPublisher";
import NewUserAccountProfileCreated from "./newUserAccountProfileCreated";

class UserAccountProfile {
  private id: UserAccountProfileId;
  private userAccountId: UserAccountId;
  private emailAddress: EmailAddress;
  private phoneNumber: PhoneNumber;

  constructor(
    aUserAccountProfileId: UserAccountProfileId,
    aUserAccountId: UserAccountId,
    aEmailAddress: EmailAddress,
    aPhoneNumber: PhoneNumber
  ) {
    this.setUserAccountProfileId(aUserAccountProfileId);
    this.setUserAccountId(aUserAccountId);
    this.setEmailAddress(aEmailAddress);
    this.setPhoneNumber(aPhoneNumber);
  }

  private setUserAccountProfileId(aUserAccountProfileId: UserAccountProfileId) {
    this.id = aUserAccountProfileId;
  }

  private setUserAccountId(aUserAccountId: UserAccountId) {
    this.userAccountId = aUserAccountId;
  }

  private setEmailAddress(aEmailAddress: EmailAddress) {
    this.emailAddress = aEmailAddress;
  }

  private setPhoneNumber(aPhoneNumber: PhoneNumber) {
    this.phoneNumber = aPhoneNumber;
  }

  getId(): string {
    return this.id.getId();
  }
  getEmailAddress(): string {
    return this.emailAddress.getValue();
  }

  getPhoneNumber(): string {
    return this.phoneNumber.getValue();
  }

  async publishNewUserAccountProfileCreatedEvent(
    aDomainEventPublisher: DomainEventPublisher
  ): Promise<void> {
    await aDomainEventPublisher.publish(
      new NewUserAccountProfileCreated(
        this.id.getId(),
        this.userAccountId.getId()
      )
    );
  }
}

export default UserAccountProfile;
