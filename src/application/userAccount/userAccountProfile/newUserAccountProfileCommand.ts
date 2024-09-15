class NewUserAccountProfileCommand {
  private userAccountId: string;
  private userProfileId: string;
  private emailAddress: string;
  private phoneNumber: {
    number: string;
    countryCode: string;
  };

  constructor(
    aUserAccountId: string,
    aUserProfileId: string,
    anEmailAddress: string,
    aPhoneNumber: string,
    aCountryCode: string
  ) {
    this.userAccountId = aUserAccountId;
    this.userProfileId = aUserProfileId;
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
