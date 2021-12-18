import { useRef, useState, useContext } from "react";

import AuthContext from "../store/auth-context";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";

import InputTextField from "../components/Input/InputTextField";
import { validateInput } from "../validations/validate-input";
import { INPUT_HELPERTEXT_PASSWORD } from "../constants/input/helper_text";

function ChangePassword() {
  /* ------------------------------ State ------------------------------ */
  const [enteredNewPasswordIsValid, setEnteredNewPasswordIsValid] =
    useState(false);
  const [
    enteredNewConfirmPasswordIsMatch,
    setEnteredNewConfirmPasswordIsMatch,
  ] = useState(false);
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
  
  /* ------------------------------ Input Reference ------------------------------ */
  const currentPasswordInputRef = useRef();
  const newPasswordInputRef = useRef();
  const newConfirmPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  /* ------------------------------ Method ------------------------------ */
  const submitHandler = (event) => {
    event.preventDefault();

    const currentUserEmail = authCtx.user.email;
    const enteredCurrentPassword = currentPasswordInputRef.current.value;
    const enteredNewPassword = newPasswordInputRef.current.value;
    const enteredNewConfirmPassword = newConfirmPasswordInputRef.current.value;

    setSubmitButtonClicked(true);

    const { passwordIsValid, confirmPasswordIsMatch } = validateInput({
      enteredPassword: enteredNewPassword,
      enteredConfirmPassword: enteredNewConfirmPassword,
    });

    setEnteredNewPasswordIsValid(passwordIsValid);
    setEnteredNewConfirmPasswordIsMatch(confirmPasswordIsMatch);

    if (!passwordIsValid || !confirmPasswordIsMatch) {
      return;
    }

    authCtx.updatePassword(
      currentUserEmail,
      enteredCurrentPassword,
      enteredNewPassword
    );
  };

  return (
    <Card>
      <form onSubmit={submitHandler}>
        <CardHeader title="Change Password" />
        <CardContent>
          <InputTextField
            label="Current Password"
            type="password"
            inputRef={currentPasswordInputRef}
          />
          <InputTextField
            error={submitButtonClicked && !enteredNewPasswordIsValid}
            helperText={INPUT_HELPERTEXT_PASSWORD}
            label="New Password"
            type="password"
            inputRef={newPasswordInputRef}
          />
          <InputTextField
            error={submitButtonClicked && !enteredNewConfirmPasswordIsMatch}
            label="Confirm New Password"
            type="password"
            inputRef={newConfirmPasswordInputRef}
          />
        </CardContent>
        <CardActions>
          <Button type="submit" variant="contained">
            Change Password
          </Button>
        </CardActions>
      </form>
    </Card>
  );
}

export default ChangePassword;
