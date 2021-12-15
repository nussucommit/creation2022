import authErrorResponses from "../constants/Authentication/AuthErrorResponses";
import inputPatterns from "../constants/Authentication/InputPatterns";

const WARNING_INVALID_EMAIL = authErrorResponses["INVALID_EMAIL_PATTERN"];
const WARNING_INVALID_PASSWORD = authErrorResponses["INVALID_PASSWORD_PATTERN"];
const WARNING_UNMATCH_CONFIRM_PASSWORD = authErrorResponses["PASSWORD_NOT_MATCH"]; 

const matchPattern = (input, regex) => {
  return regex.test(input);
}

export const validateInput = (enteredEmail, enteredPassword, enteredConfirmPassword, isSigningIn) => {
  const validEmailPattern = inputPatterns["email"];
  const validPasswordPattern = inputPatterns["password"];

  const emailPatternIsValid = matchPattern(enteredEmail, validEmailPattern);
  if (!emailPatternIsValid) {
    alert(WARNING_INVALID_EMAIL);
  }

  const passwordPatternIsValid = isSigningIn || matchPattern(enteredPassword, validPasswordPattern);
  if (!passwordPatternIsValid) {
    alert(WARNING_INVALID_PASSWORD);
  }

  const confirmPasswordIsMatch = isSigningIn || enteredPassword === enteredConfirmPassword;
  if (!confirmPasswordIsMatch) {
    alert(WARNING_UNMATCH_CONFIRM_PASSWORD);
  }

  return {
    emailIsValid: emailPatternIsValid,
    passwordIsValid: passwordPatternIsValid,
    confirmPasswordIsMatch,
  };
}