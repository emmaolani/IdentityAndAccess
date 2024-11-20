class NewPersonalInfoCommand {
  private firstName: string;
  private lastName: string;
  private emailAddress: string;
  private phoneNumber: string;
  private birthDate: Date;
  private address: string;

  constructor(
    aFirstName: string,
    aLastName: string,
    anEmailAddress: string,
    aPhoneNumber: string,
    aBirthDate: Date,
    anAddress: string
  ) {
    this.firstName = aFirstName;
    this.lastName = aLastName;
    this.emailAddress = anEmailAddress;
    this.phoneNumber = aPhoneNumber;
    this.birthDate = aBirthDate;
    this.address = anAddress;
  }

  getFirstName() {
    return this.firstName;
  }

  getLastName() {
    return this.lastName;
  }

  getEmailAddress() {
    return this.emailAddress;
  }

  getPhoneNumber() {
    return this.phoneNumber;
  }

  getBirthDate() {
    return this.birthDate;
  }

  getAddress() {
    return this.address;
  }
}

export default NewPersonalInfoCommand;
