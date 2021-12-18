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
  const usernameInputRef = useRef("");
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef("");

  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [enteredUsernameIsValid, setEnteredUsernameIsValid] = useState(false);
  const [enteredEmailIsValid, setEnteredEmailIsValid] = useState(false);
  const [enteredPasswordIsValid, setEnteredPasswordIsValid] = useState(false);
  const [enteredConfirmPasswordIsMatch, setEnteredConfirmPasswordIsMatch] =
    useState(false);
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredUsername = usernameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;

    setSubmitButtonClicked(true);

    const {
      usernameIsValid,
      emailIsValid,
      passwordIsValid,
      confirmPasswordIsMatch,
    } = isSignin
      ? validateInput({ enteredEmail })
      : validateInput({
          enteredUsername,
          enteredEmail,
          enteredPassword,
          enteredConfirmPassword,
        });

    setEnteredUsernameIsValid(usernameIsValid);
    setEnteredEmailIsValid(emailIsValid);
    setEnteredPasswordIsValid(passwordIsValid);
    setEnteredConfirmPasswordIsMatch(confirmPasswordIsMatch);

    if (
      !usernameIsValid ||
      !emailIsValid ||
      !passwordIsValid ||
      !confirmPasswordIsMatch
    ) {
      return;
    }
    setIsLoading(true);

    isSignin
      ? authCtx.signin(enteredEmail, enteredPassword)
      : authCtx.signup(enteredUsername, enteredEmail, enteredPassword);

    setIsLoading(false);
  };

  return (
    <Card raised>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {isSignin ? "Sign in to continue" : "Sign up to continue"}
        </Typography>
        <form onSubmit={submitHandler}>
          {!isSignin && (
            <TextField
              error={submitButtonClicked && !enteredUsernameIsValid}
              fullWidth
              helperText="Tip: At least 5 to 20 characters without whitespace. Allowed symbols: A-Z, a-z, 0-9, _."
              label="Username"
              required
              variant="outlined"
              inputRef={usernameInputRef}
            />
          )}
          <TextField
            error={submitButtonClicked && !enteredEmailIsValid}
            fullWidth
            helperText="Example: e1234567@u.nus.edu or nus.friendly.mail_99@u.nus.edu"
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
            helperText={
              isSignin
                ? ""
                : "Tip: At least eight characters without whitespace. Allowed symbols: A-Z, a-z, 0-9, @$!%*#?&"
            }
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
              <Button component={NavLink} to="/reset-password">
                Forgot password?
              </Button>
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
