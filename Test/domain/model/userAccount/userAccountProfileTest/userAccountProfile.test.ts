import UserAccountProfile from "../../../../../src/domain/model/userAccount/userAccountProfile/userAccountProfile";
import UserAccountProfileId from "../../../../../src/domain/model/userAccount/userAccountProfile/userAccountProfileId";
import UserAccountId from "../../../../../src/domain/model/userAccount/userAccountId";
import EmailAddress from "../../../../../src/domain/model/contactDetails/emailAddress";
import ITUAndISOSpecId from "../../../../../src/domain/model/geographicEntities/ITUAndISOSpecId";
import PhoneNumber from "../../../../../src/domain/model/contactDetails/phoneNumber";
import UUIDGenerator from "../../../../../src/port/util/uUIDGenerator";

describe("User Account Profile", () => {
  let userAccountProfile: UserAccountProfile;

  it("should create a new user account profile", () => {
    const userAccountProfileId = new UserAccountProfileId(
      new UUIDGenerator().generate()
    );
    const userAccountId = new UserAccountId(new UUIDGenerator().generate());
    const emailAddress = new EmailAddress("email@test.com", true, null);
    const phoneNumber = new PhoneNumber(
      "1234567890",
      newITUAndISOSpecId(),
      true,
      null
    );

    userAccountProfile = new UserAccountProfile(
      userAccountProfileId,
      userAccountId,
      emailAddress,
      phoneNumber
    );

    assertThatPropertiesIn_userAccountProfile_match(
      userAccountProfileId,
      userAccountId,
      emailAddress,
      phoneNumber
    );
  });

  function newITUAndISOSpecId() {
    return new ITUAndISOSpecId(new UUIDGenerator().generate());
  }

  function assertThatPropertiesIn_userAccountProfile_match(
    aUserAccountProfileId: UserAccountProfileId,
    aUserAccountId: UserAccountId,
    aEmailAddress: EmailAddress,
    aPhoneNumber: PhoneNumber
  ) {
    expect(userAccountProfile["id"]).toBe(aUserAccountProfileId);
    expect(userAccountProfile["userAccountId"]).toBe(aUserAccountId);
    expect(userAccountProfile["emailAddress"]).toBe(aEmailAddress);
    expect(userAccountProfile["phoneNumber"]).toBe(aPhoneNumber);
  }

  it("returns the user account profile id", () => {
    const id = new UUIDGenerator().generate();
    const userAccountProfileId = new UserAccountProfileId(id);
    const userAccountId = new UserAccountId(new UUIDGenerator().generate());
    const emailAddress = new EmailAddress("email@test.com", true, null);
    const phoneNumber = new PhoneNumber(
      "1234567890",
      newITUAndISOSpecId(),
      true,
      null
    );

    userAccountProfile = new UserAccountProfile(
      userAccountProfileId,
      userAccountId,
      emailAddress,
      phoneNumber
    );

    expect(userAccountProfile.getId()).toBe(id);
  });

  it("returns the email address", () => {
    const userAccountProfileId = new UserAccountProfileId(
      new UUIDGenerator().generate()
    );
    const userAccountId = new UserAccountId(new UUIDGenerator().generate());
    const emailAddress = new EmailAddress("email@test.com", true, null);
    const phoneNumber = new PhoneNumber(
      "1234567890",
      newITUAndISOSpecId(),
      true,
      null
    );

    userAccountProfile = new UserAccountProfile(
      userAccountProfileId,
      userAccountId,
      emailAddress,
      phoneNumber
    );

    expect(userAccountProfile.getEmailAddress()).toBe("email@test.com");
  });

  it("returns the phone number", () => {
    const userAccountProfileId = new UserAccountProfileId(
      new UUIDGenerator().generate()
    );
    const userAccountId = new UserAccountId(new UUIDGenerator().generate());
    const emailAddress = new EmailAddress("email@test.com)", true, null);
    const phoneNumber = new PhoneNumber(
      "1234567890",
      newITUAndISOSpecId(),
      true,
      null
    );

    userAccountProfile = new UserAccountProfile(
      userAccountProfileId,
      userAccountId,
      emailAddress,
      phoneNumber
    );

    expect(userAccountProfile.getPhoneNumber()).toBe("1234567890");
  });
});
