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

enum verificationCodeError {
  invalidTimeStamp = "TimeStamp for verificationCode is invalid",
  invalidCode = "Invalid verification code",
  expiredCode = "verification code is expired",
}

export { phoneNumberError, emailAddressError, verificationCodeError };
