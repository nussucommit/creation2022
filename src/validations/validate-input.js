import authErrorResponses from "../constants/Authentication/AuthErrorResponses";
import inputPatterns from "../constants/Authentication/InputPatterns";

const WARNING_INVALID_USERNAME = authErrorResponses["INVALID_USERNAME_PATTERN"];
const WARNING_INVALID_EMAIL = authErrorResponses["INVALID_EMAIL_PATTERN"];
const WARNING_INVALID_PASSWORD = authErrorResponses["INVALID_PASSWORD_PATTERN"];
const WARNING_UNMATCH_CONFIRM_PASSWORD =
  authErrorResponses["PASSWORD_NOT_MATCH"];

const matchPattern = (input, regex) => {
  return regex.test(input);
};

export const validateInput = (
  enteredInput, setSnackbarMessage
) => {

  const {enteredUsername, enteredEmail, enteredPassword, enteredConfirmPassword}
  = enteredInput;

  const validUsernamePattern = inputPatterns["username"];
  const validEmailPattern = inputPatterns["email"];
  const validPasswordPattern = inputPatterns["password"];

  const usernamePatternIsValid =
    !enteredUsername || matchPattern(enteredUsername, validUsernamePattern);
  if (!usernamePatternIsValid) {
    setSnackbarMessage(WARNING_INVALID_USERNAME);
  }

  const emailPatternIsValid = !enteredEmail || matchPattern(enteredEmail, validEmailPattern);
  if (!emailPatternIsValid) {
    setSnackbarMessage(WARNING_INVALID_EMAIL);
  }

  const passwordPatternIsValid =
    !enteredPassword || matchPattern(enteredPassword, validPasswordPattern);
  if (!passwordPatternIsValid) {
    setSnackbarMessage(WARNING_INVALID_PASSWORD);
  }

  const confirmPasswordIsMatch =
    !enteredConfirmPassword || enteredPassword === enteredConfirmPassword;
  if (!confirmPasswordIsMatch) {
    setSnackbarMessage(WARNING_UNMATCH_CONFIRM_PASSWORD);
  }

  return {
    usernameIsValid: usernamePatternIsValid,
    emailIsValid: emailPatternIsValid,
    passwordIsValid: passwordPatternIsValid,
    confirmPasswordIsMatch,
  };
};
