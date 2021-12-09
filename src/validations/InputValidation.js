export function compareString(string1, string2, errorMessage) {
  const isMatch = string1 === string2;
  if (!isMatch) {
    alert(errorMessage);
  }
  return isMatch;
}

function validateString(stringToValidate, regex) {
  return regex.test(stringToValidate);
}

function validateInput(inputToValidate, patternToFollow, errorMessage) {
  const isValid = validateString(inputToValidate, patternToFollow);
  if (!isValid) {
    alert(errorMessage);
  }
  return isValid;
}

export default validateInput;
