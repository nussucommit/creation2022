const authErrorResponses = {
  EMAIL_NOT_FOUND: "This email is not registered yet, please sign up instead.",
  EMAIL_EXISTS: "The email is registered, please login instead.",
  INVALID_EMAIL_PATTERN: "The email provided must be a valid NUS email.",
  INVALID_PASSWORD: "Wrong password, please try again.",
  INVALID_PASSWORD_PATTERN:
    "The password must have minimum eight characters, at least one letter and one number.",
  PASSWORD_NOT_MATCH:
    "Please make sure your password and confirm password match.",
  CREDENTIAL_TOO_OLD_LOGIN_AGAIN:
    "Please logout and re-login again to continue.",
};

export default authErrorResponses;
