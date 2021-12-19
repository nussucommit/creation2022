import { useState, useRef, useContext } from "react";

import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import AuthContext from "../../store/auth-context";
import SnackbarContext from "../../store/snackbar-context";
import InputTextField from "../Input/InputTextField";
import { validateInput } from "../../validations/validate-input";
import {
  INPUT_HELPERTEXT_USERNAME,
  INPUT_HELPERTEXT_EMAIL,
  INPUT_HELPERTEXT_PASSWORD,
} from "../../constants/input/helper_text";

function AuthForm({ isSignin }) {
  /* ------------------------------ Context ------------------------------ */
  const authCtx = useContext(AuthContext);
  const snackbarCtx = useContext(SnackbarContext);

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
  const resetPasswordButtonText = "Forgot password?";
  const loadingText = isSignin ? "Logging in..." : "Creating account...";

  /* ------------------------------ Path Link ------------------------------ */
  const switchButtonLink = isSignin ? "/signup" : "/signin";
  const resetPasswordButtonLink = "/reset-password";

  /* ------------------------------ Method ------------------------------ */
  const submitHandler = (event) => {
    event.preventDefault();

    setSubmitButtonClicked(true);

    const enteredUsername = usernameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;

    const inputTovalidate = isSignin
      ? { enteredEmail }
      : {
          enteredUsername,
          enteredEmail,
          enteredPassword,
          enteredConfirmPassword,
        };
    const setWarningSnackbar = (message) =>
      snackbarCtx.setSnackbar({ open: true, message, type: "warning" });

    const {
      usernameIsValid,
      emailIsValid,
      passwordIsValid,
      confirmPasswordIsMatch,
    } = validateInput(inputTovalidate, setWarningSnackbar);

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
          {/* ------------------------- Text fields --------------------- */}
          {!isSignin && (
            <InputTextField
              error={submitButtonClicked && !enteredUsernameIsValid}
              helperText={INPUT_HELPERTEXT_USERNAME}
              placeholder="Username"
              icon={<AccountCircleOutlinedIcon />}
              inputRef={usernameInputRef}
            />
          )}
          <InputTextField
            error={submitButtonClicked && !enteredEmailIsValid}
            helperText={INPUT_HELPERTEXT_EMAIL}
            placeholder="NUS Email"
            icon={<MailOutlineIcon />}
            inputRef={emailInputRef}
          />
          <InputTextField
            error={submitButtonClicked && !enteredPasswordIsValid}
            placeholder="Password"
            helperText={isSignin ? "" : INPUT_HELPERTEXT_PASSWORD}
            type="password"
            icon={<LockOutlinedIcon />}
            inputRef={passwordInputRef}
          />
          {!isSignin && (
            <InputTextField
              error={submitButtonClicked && !enteredConfirmPasswordIsMatch}
              placeholder="Confirm Password"
              type="password"
              icon={<LockOutlinedIcon />}
              inputRef={confirmPasswordInputRef}
            />
          )}
          {/* ------------------------- Buttons --------------------- */}
          {!isLoading && (
            <Button type="submit" variant="contained" fullWidth>
              {submitButtonText}
            </Button>
          )}
          <Button component={NavLink} to={switchButtonLink} fullWidth>
            {switchButtonText}
          </Button>
          {isSignin && (
            <Button component={NavLink} to={resetPasswordButtonLink} fullWidth>
              {resetPasswordButtonText}
            </Button>
          )}
          {isLoading && <Typography variant="button">{loadingText}</Typography>}
        </CardContent>
      </form>
    </Card>
  );
}

export default AuthForm;
