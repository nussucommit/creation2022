import { useState, useRef, useContext } from "react";

import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import AuthContext from "../../store/auth-context";
import { validateInput } from "../../validations/validate-input";

export default function AuthForm({ isSignin }) {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [enteredEmailIsValid, setEnteredEmailIsValid] = useState(false);
  const [enteredPasswordIsValid, setEnteredPasswordIsValid] = useState(false);
  const [enteredConfirmPasswordIsMatch, setEnteredConfirmPasswordIsMatch] =
    useState(false);
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = isSignin
      ? ""
      : confirmPasswordInputRef.current.value;

    setSubmitButtonClicked(true);

    const { emailIsValid, passwordIsValid, confirmPasswordIsMatch } =
      validateInput(
        enteredEmail,
        enteredPassword,
        enteredConfirmPassword,
        isSignin
      );

    setEnteredEmailIsValid(emailIsValid);
    setEnteredPasswordIsValid(passwordIsValid);
    setEnteredConfirmPasswordIsMatch(confirmPasswordIsMatch);

    if (!emailIsValid || !passwordIsValid || !confirmPasswordIsMatch) {
      return;
    }
    setIsLoading(true);

    isSignin
      ? authCtx.signin(enteredEmail, enteredPassword)
      : authCtx.signup(enteredEmail, enteredPassword);

    setIsLoading(false);
  };

  return (
    <Card raised>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {isSignin ? "Sign in to continue" : "Sign up to continue"}
        </Typography>
        <form onSubmit={submitHandler}>
          <TextField
            error={submitButtonClicked && !enteredEmailIsValid}
            fullWidth
            helperText="Example: e1234567@u.nus.edu"
            label="NUS Email"
            required
            variant="outlined"
            inputRef={emailInputRef}
          />
          <TextField
            error={submitButtonClicked && !enteredPasswordIsValid}
            fullWidth
            label="Password"
            required
            type="password"
            variant="outlined"
            inputRef={passwordInputRef}
          />
          {!isSignin && (
            <TextField
              error={submitButtonClicked && !enteredConfirmPasswordIsMatch}
              fullWidth
              label="Confirm Password"
              required
              type="password"
              variant="outlined"
              inputRef={confirmPasswordInputRef}
            />
          )}
          {isSignin && (
            <CardActions>
              <Button>Forgot password?</Button>
            </CardActions>
          )}
          <CardActions>
            <Button component={NavLink} to={isSignin ? "/signup" : "/signin"}>
              {isSignin ? "Create new account" : "Login with existing account"}
            </Button>
            {!isLoading && (
              <Button type="submit">
                {isSignin ? "Login" : "Create Account"}
              </Button>
            )}
            {isLoading && <p>Sending request...</p>}
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
}
