import { useState, useRef, useContext } from "react";

import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import SendIcon from "@mui/icons-material/Send";
import Typography from "@mui/material/Typography";

import AuthContext from "../store/auth-context";
import InputTextField from "../components/Input/InputTextField";
import { validateInput } from "../validations/validate-input";
import { INPUT_HELPERTEXT_EMAIL } from "../constants/input/helper_text";

function ResetPassword() {
  /* ------------------------------ Context ------------------------------ */
  const authCtx = useContext(AuthContext);

  /* ------------------------------ State ------------------------------ */
  const [enteredEmailIsValid, setEnteredEmailIsValid] = useState(false);
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
  const [emailIsSent, setEmailIsSent] = useState(false);

  /* ------------------------------ Input Reference ------------------------------ */
  const emailInputRef = useRef();

  /* ------------------------------ Method ------------------------------ */
  const sendPasswordResetEmailHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;

    setSubmitButtonClicked(true);

    const { emailIsValid } = validateInput({ enteredEmail });
    setEnteredEmailIsValid(emailIsValid);

    if (!emailIsValid) {
      return;
    }

    authCtx.resetPasswordByEmail(enteredEmail);
    setEmailIsSent(true);
  };

  return (
    <Card raised>
      <CardHeader title="Reset Password" />
      <form onSubmit={sendPasswordResetEmailHandler}>
        <CardContent>
          <InputTextField
            error={submitButtonClicked && !enteredEmailIsValid}
            label="Enter your email here"
            helperText={INPUT_HELPERTEXT_EMAIL}
            inputRef={emailInputRef}
          />
        </CardContent>
        <CardActions>
          <Button component={NavLink} to={"/signin"} variant="outlined">
            Cancel
          </Button>
          {!emailIsSent && (
            <Button type="submit" variant="contained" endIcon={<SendIcon />}>
              Send reset password email
            </Button>
          )}
          {emailIsSent && (
            <Typography variant="button" sx={{marginLeft: '10px'}}>
              Email sent
            </Typography>
          )}
        </CardActions>
      </form>
    </Card>
  );
}

export default ResetPassword;
