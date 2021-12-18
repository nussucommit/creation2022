import { useState, useRef, useContext } from "react";

import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import AuthContext from "../../store/auth-context";
import InputTextField from "../Input/InputTextField";
import { validateInput } from "../../validations/validate-input";
import {
  INPUT_HELPERTEXT_USERNAME,
  INPUT_HELPERTEXT_EMAIL,
  INPUT_HELPERTEXT_PASSWORD,
} from "../../constants/input/helper_text";

export default function AuthForm({ isSignin }) {
  /* ------------------------------ Context ------------------------------ */
  const authCtx = useContext(AuthContext);

  /* ------------------------------ State ------------------------------ */
  const [isLoading, setIsLoading] = useState(false);
  const [enteredUsernameIsValid, setEnteredUsernameIsValid] = useState(false);
  const [enteredEmailIsValid, setEnteredEmailIsValid] = useState(false);
  const [enteredPasswordIsValid, setEnteredPasswordIsValid] = useState(false);
  const [enteredConfirmPasswordIsMatch, setEnteredConfirmPasswordIsMatch] =
    useState(false);
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);

  /* ------------------------------ Input Reference ------------------------------ */
  const usernameInputRef = useRef("");
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef("");

  /* ------------------------------ Text ------------------------------ */
  const formTitle = `Sign ${isSignin ? "in" : "up"} to continue`;
  const switchButtonText = `${
    isSignin ? "Create new" : "Login with existing"
  } account`;
  const submitButtonText = isSignin ? "Login" : "Create Account";
  const loadingText = isSignin ? "Logging in..." : "Creating account...";

  /* ------------------------------ Method ------------------------------ */
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
      <CardHeader title={formTitle} />
      <form onSubmit={submitHandler}>
        <CardContent>
          {!isSignin && (
            <InputTextField
              error={submitButtonClicked && !enteredUsernameIsValid}
              helperText={INPUT_HELPERTEXT_USERNAME}
              label="Username"
              inputRef={usernameInputRef}
            />
          )}
          <InputTextField
            error={submitButtonClicked && !enteredEmailIsValid}
            helperText={INPUT_HELPERTEXT_EMAIL}
            label="NUS Email"
            inputRef={emailInputRef}
          />
          <InputTextField
            error={submitButtonClicked && !enteredPasswordIsValid}
            label="Password"
            helperText={isSignin ? "" : INPUT_HELPERTEXT_PASSWORD}
            type="password"
            inputRef={passwordInputRef}
          />
          {!isSignin && (
            <InputTextField
              error={submitButtonClicked && !enteredConfirmPasswordIsMatch}
              label="Confirm Password"
              type="password"
              inputRef={confirmPasswordInputRef}
            />
          )}
        </CardContent>
        {isSignin && (
          <CardActions>
            <Button component={NavLink} to="/reset-password">
              Forgot password?
            </Button>
          </CardActions>
        )}
        <CardActions>
          <Button
            component={NavLink}
            to={isSignin ? "/signup" : "/signin"}
            variant="outlined"
          >
            {switchButtonText}
          </Button>
          {!isLoading && (
            <Button type="submit" variant="contained">
              {submitButtonText}
            </Button>
          )}
          {isLoading && (
            <Typography variant="button" sx={{ marginLeft: "10px" }}>
              {loadingText}
            </Typography>
          )}
        </CardActions>
      </form>
    </Card>
  );
}
