// this file contains all the error messages that can be returned by domain objects

enum verificationCodeError {
  invalidTimeStamp = "TimeStamp for verificationCode is invalid",
  invalidCode = "Invalid verification code",
  expiredCode = "verification code is expired",
}

enum phoneNumberError {
  invalidPhoneNumber = "Invalid phone number",
  phoneAlreadyActivated = "Phone number is already activated",
  noVerificationCode = "No verification code found",
}

enum emailAddressError {
  invalidEmail = "Invalid email",
  emailAlreadyActivated = "Email is already activated",
  noVerificationCode = "No verification code found",
}

enum userNamesError {
  userNameNotMeetingRequirements = "UserName does not meet requirements",
}

enum passwordError {
  passwordNotMeetingRequirements = "password does not meet security requirements",
}

enum userAccountIdError {
  invalidUUID = "Invalid user account UUID",
}

enum userAccountError {
  userAccountNotActive = "User account is not active",
  InvalidUsernameOrPassword = "Invalid username or password",
}

enum fullNameError {
  emptyFullName = "fullName is empty",
}

export {
  verificationCodeError,
  phoneNumberError,
  emailAddressError,
  userNamesError,
  passwordError,
  userAccountIdError,
  userAccountError,
  fullNameError,
};
