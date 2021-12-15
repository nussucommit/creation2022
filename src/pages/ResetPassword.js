import { useState, useRef, useContext } from "react";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";

import AuthContext from "../store/auth-context";
import { validateInput } from "../validations/validate-input";

function ResetPassword() {
  const authCtx = useContext(AuthContext);
  const emailInputRef = useRef();
  const [enteredEmailIsValid, setEnteredEmailIsValid] = useState(false);
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);

  const sendPasswordResetEmailHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;

    setSubmitButtonClicked(true);

    const { emailIsValid } = validateInput(enteredEmail, "", "", true);
    setEnteredEmailIsValid(emailIsValid);

    if (!emailIsValid) {
      return;
    }

    authCtx.resetPasswordByEmail(enteredEmail);
  };

  return (
    <Card raised>
      <CardContent>
        <form onSubmit={sendPasswordResetEmailHandler}>
          <TextField
            error={submitButtonClicked && !enteredEmailIsValid}
            variant="standard"
            label="Enter your email here"
            placeholder="e1234567@u.nus.edu"
            required
            fullWidth
            inputRef={emailInputRef}
          ></TextField>
          <CardActions>
            <Button type="submit" variant="contained" endIcon={<SendIcon />}>
              Send reset password email
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
}

export default ResetPassword;
