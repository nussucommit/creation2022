import { useRef, useState, useContext } from "react";

import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { INPUT_HELPERTEXT_PASSWORD } from "../constants/input/helper_text";
import { validateInput } from "../validations/validate-input";
import AuthContext from "../store/auth-context";
import SnackbarContext from "../store/snackbar-context";
import InputTextField from "../components/Input/InputTextField";
import FormContainer from "../components/Container/FormContainer";

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
    <FormContainer
      childComponents={[
        <h1
          className="mainTitle"
          style={{ textShadow: "0px 0px 16px #B0B0B0" }}
        >
          Change Password
        </h1>,
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
        </form>,
      ]}
    />
  );
}

export default ChangePassword;
