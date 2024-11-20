class NewUserAccountProfileCommand {
  private userProfileId: string;
  private userAccountId: string;
  private emailAddress: string;
  private phoneNumber: {
    number: string;
    countryCode: string;
  };

  constructor(
    aUserProfileId: string,
    aUserAccountId: string,
    anEmailAddress: string,
    aPhoneNumber: string,
    aCountryCode: string
  ) {
    this.userProfileId = aUserProfileId;
    this.userAccountId = aUserAccountId;
    this.emailAddress = anEmailAddress;
    this.phoneNumber = {
      number: aPhoneNumber,
      countryCode: aCountryCode,
    };
  }

  getUserAccountId(): string {
    return this.userAccountId;
  }

  getUserProfileId(): string {
    return this.userProfileId;
  }

  getEmailAddress(): string {
    return this.emailAddress;
  }

  getPhoneNumber(): {
    number: string;
    countryCode: string;
  } {
    return this.phoneNumber;
  }
}
export default NewUserAccountProfileCommand;
