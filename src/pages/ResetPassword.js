import { useState, useRef, useContext } from "react";

import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import SendIcon from "@mui/icons-material/Send";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Typography from "@mui/material/Typography";

import AuthContext from "../store/auth-context";
import SnackbarContext from "../store/snackbar-context";
import FormContainer from "../components/Container/FormContainer";
import InputTextField from "../components/Input/InputTextField";
import { validateInput } from "../validations/validate-input";
import { INPUT_HELPERTEXT_EMAIL } from "../constants/input/helper_text";

function ResetPassword() {
  /* ------------------------------ Context ------------------------------ */
  const authCtx = useContext(AuthContext);
  const snackbarCtx = useContext(SnackbarContext);

  /* ------------------------------ State ------------------------------ */
  const [enteredEmailIsValid, setEnteredEmailIsValid] = useState(false);
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);

  /* ------------------------------ Input Reference ------------------------------ */
  const emailInputRef = useRef();

  /* ------------------------------ Method ------------------------------ */
  const sendPasswordResetEmailHandler = (event) => {
    event.preventDefault();
    setSubmitButtonClicked(true);

    const enteredEmail = emailInputRef.current.value;
    const inputToValidate = { enteredEmail };
    const setWarningSnackbar = (message) =>
      snackbarCtx.setSnackbar({ open: true, message, type: "warning" });
    const { emailIsValid } = validateInput(inputToValidate, setWarningSnackbar);

    setEnteredEmailIsValid(emailIsValid);
    if (!emailIsValid) {
      return;
    }

    authCtx.resetPasswordByEmail(enteredEmail);
  };

  return (
    <FormContainer
      childComponents={[
        <Typography variant="h4">Reset your password via email</Typography>,
        <form onSubmit={sendPasswordResetEmailHandler}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <InputTextField
              error={submitButtonClicked && !enteredEmailIsValid}
              placeholder="NUS Email"
              helperText={INPUT_HELPERTEXT_EMAIL}
              icon={<MailOutlineIcon />}
              inputRef={emailInputRef}
            />
          </CardContent>

          <Button
            type="submit"
            variant="contained"
            endIcon={<SendIcon />}
            fullWidth
          >
            Send reset password email
          </Button>
        </form>,
        <Button component={NavLink} to={"/signin"} fullWidth>
          Cancel
        </Button>,
      ]}
    />
  );
}

export default ResetPassword;
