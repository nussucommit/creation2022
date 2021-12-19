import { useRef, useState, useContext } from "react";

import AuthContext from "../store/auth-context";
import SnackbarContext from "../store/snackbar-context";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import InputTextField from "../components/Input/InputTextField";
import FormContainer from "../components/Input/FormContainer";
import { validateInput } from "../validations/validate-input";
import { INPUT_HELPERTEXT_PASSWORD } from "../constants/input/helper_text";

function ChangePassword() {
  /* ------------------------------ Context ------------------------------ */
  const authCtx = useContext(AuthContext);
  const snackbarCtx = useContext(SnackbarContext);

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

  /* ------------------------------ Method ------------------------------ */
  const submitHandler = (event) => {
    event.preventDefault();
    setSubmitButtonClicked(true);

    const currentUserEmail = authCtx.user.email;
    const enteredCurrentPassword = currentPasswordInputRef.current.value;
    const enteredNewPassword = newPasswordInputRef.current.value;
    const enteredNewConfirmPassword = newConfirmPasswordInputRef.current.value;

    const inputToValidate = {
      enteredPassword: enteredNewPassword,
      enteredConfirmPassword: enteredNewConfirmPassword,
    };
    const setWarningSnackbar = (message) =>
      snackbarCtx.setSnackbar({ open: true, message, type: "warning" });

    const { passwordIsValid, confirmPasswordIsMatch } = validateInput(
      inputToValidate,
      setWarningSnackbar
    );

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
    <FormContainer>
      <Card raised>
        <CardHeader title="Change Password" />
        <form onSubmit={submitHandler}>
          <CardContent>
            <InputTextField
              placeholder="Current Password"
              type="password"
              icon={<LockOutlinedIcon />}
              inputRef={currentPasswordInputRef}
            />
            <InputTextField
              error={submitButtonClicked && !enteredNewPasswordIsValid}
              helperText={INPUT_HELPERTEXT_PASSWORD}
              placeholder="New Password"
              type="password"
              icon={<LockOutlinedIcon />}
              inputRef={newPasswordInputRef}
            />
            <InputTextField
              error={submitButtonClicked && !enteredNewConfirmPasswordIsMatch}
              placeholder="Confirm New Password"
              type="password"
              icon={<LockOutlinedIcon />}
              inputRef={newConfirmPasswordInputRef}
            />
          </CardContent>
          <CardActions>
            <Button type="submit" variant="contained" fullWidth>
              Change Password
            </Button>
          </CardActions>
        </form>
      </Card>
    </FormContainer>
  );
}

export default ChangePassword;
