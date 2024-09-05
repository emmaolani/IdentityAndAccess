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

export { userNamesError, passwordError, userAccountIdError, userAccountError };
