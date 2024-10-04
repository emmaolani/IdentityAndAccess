class TestPrerequisiteData {
  static passwordAuthenticationMethodProperties = {
    id: "550e8400-e29b-41d4-a716-446655440000",
    type: "password",
  };
  static emailMFAAuthenticationMethodProperties = {
    id: "550f8411-e29b-41d4-a716-446655440000",
    type: "password",
  };
  static phoneMFAAuthenticationMethodProperties = {
    id: "550f8411-e28b-41c4-a717-446655440000",
    type: "password",
  };

  static restrictionProperties = {
    id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    reason: "awaiting profile creation",
  };
  static userAccountProperties = {
    id: "e47ac10b-58cc-4372-a567-0e02b2c3d406",
    username: "username",
    password: "123Emm@oaa",
  };
  static ITUAndISOSpecificationProperties = {
    id: "f47bc10b-58cc-4392-a567-0e02b2c3d606",
    countryId: "id",
    countryCode: "NG",
    callingCode: "234",
  };
  static userAccountProfileProperties = {
    id: "c69bc10b-58cc-4392-a567-0e02b2b3d606",
    email: "test@tester.com",
    phone: "8127456800",
  };
}

export default TestPrerequisiteData;
