import { useState, useRef, useContext } from "react";

import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import SendIcon from "@mui/icons-material/Send";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

import AuthContext from "../store/auth-context";
import SnackbarContext from "../store/snackbar-context";
import FormContainer from "../components/Input/FormContainer";
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
    <FormContainer>
      <Card raised>
        <CardHeader title="Reset Password" />
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
            <Button
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
              fullWidth
            >
              Send reset password email
            </Button>
            <Button component={NavLink} to={"/signin"} fullWidth>
              Cancel
            </Button>
          </CardContent>
        </form>
      </Card>
    </FormContainer>
  );
}

export default ResetPassword;
