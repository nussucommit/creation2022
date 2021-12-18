import { useRef, useState, useContext } from "react";

import AuthContext from "../store/auth-context";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { validateInput } from "../validations/validate-input";

function ChangePassword() {
  const currentPasswordInputRef = useRef();
  const newPasswordInputRef = useRef();
  const newConfirmPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const [enteredNewPasswordIsValid, setEnteredNewPasswordIsValid] =
    useState(false);
  const [
    enteredNewConfirmPasswordIsMatch,
    setEnteredNewConfirmPasswordIsMatch,
  ] = useState(false);
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);

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
      <CardContent>
        <form onSubmit={submitHandler}>
          <Typography variant="h5">Enter Your Current Password</Typography>
          <TextField
            fullWidth
            label="Current Password"
            required
            type="password"
            variant="outlined"
            inputRef={currentPasswordInputRef}
          />
          <Typography variant="h5">Enter Your New Password</Typography>
          <TextField
            error={submitButtonClicked && !enteredNewPasswordIsValid}
            fullWidth
            helperText="Tip: At least eight characters with no spaces. Allowed symbols: A-Z, a-z, 0-9, @$!%*#?&"
            label="New Password"
            required
            type="password"
            variant="outlined"
            inputRef={newPasswordInputRef}
          />
          <TextField
            error={submitButtonClicked && !enteredNewConfirmPasswordIsMatch}
            fullWidth
            label="Confirm New Password"
            required
            type="password"
            variant="outlined"
            inputRef={newConfirmPasswordInputRef}
          />
          <CardActions>
            <Button type="submit" variant="outlined">
              Change Password
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
}

export default ChangePassword;
