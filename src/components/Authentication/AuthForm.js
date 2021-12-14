import { useState, useRef, useContext } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import AuthContext from "../../store/auth-context";
import authErrorResponses from "../../constants/Authentication/AuthErrorResponses";
import validateInput, {
  compareString,
} from "../../validations/InputValidation";
import inputPatterns from "../../constants/Authentication/InputPatterns";

export default function AuthForm({ isSignin }) {
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin] = useState(isSignin);
  const [isLoading, setIsLoading] = useState(false);

  const [enteredEmailIsValid, setEnteredEmailIsValid] = useState(false);
  const [enteredPasswordIsValid, setEnteredPasswordIsValid] = useState(false);
  const [enteredConfirmPasswordIsValid, setEnteredConfirmPasswordIsValid] =
    useState(false);
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();

    /** Input validation */
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = isLogin
      ? ""
      : confirmPasswordInputRef.current.value;

    setSubmitButtonClicked(true);

    const emailIsValid = validateInput(
      enteredEmail,
      inputPatterns["email"],
      "The email provided must be NUS email and cannot be blank!"
    );

    const passwordIsValid =
      isLogin ||
      validateInput(
        enteredPassword,
        inputPatterns["password"],
        "The password must have minimum eight characters, at least one letter and one number!"
      );

    const confirmPasswordIsMatched =
      isLogin ||
      compareString(
        enteredPassword,
        enteredConfirmPassword,
        "Please make sure your password and confirm password match!"
      );

    emailIsValid ? setEnteredEmailIsValid(true) : setEnteredEmailIsValid(false);

    passwordIsValid
      ? setEnteredPasswordIsValid(true)
      : setEnteredPasswordIsValid(false);

    confirmPasswordIsMatched
      ? setEnteredConfirmPasswordIsValid(true)
      : setEnteredConfirmPasswordIsValid(false);

    if (!emailIsValid || !passwordIsValid || !confirmPasswordIsMatched) {
      return;
    }
    setIsLoading(true);

    /** Backend validation */
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBuRBQUOL9pRCG_uAPC6c-CBibziO4f7-w";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBuRBQUOL9pRCG_uAPC6c-CBibziO4f7-w";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            // Future improvement: using a snackbar instead
            throw new Error(authErrorResponses[errorMessage]);
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        authCtx.login(data.idToken, enteredEmail, enteredPassword, expirationTime.toISOString());
        navigate("/home", { replace: true });
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Card raised>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {isLogin ? "Sign in to continue" : "Sign up to continue"}
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
          {!isLogin && (
            <TextField
              error={submitButtonClicked && !enteredConfirmPasswordIsValid}
              fullWidth
              label="Confirm Password"
              required
              type="password"
              variant="outlined"
              inputRef={confirmPasswordInputRef}
            />
          )}
          <CardActions>
            <Button component={NavLink} to={isLogin ? "/signup" : "/signin"}>
              {isLogin ? "Create new account" : "Login with existing account"}
            </Button>
          </CardActions>
          <CardActions>
            {!isLoading && (
              <Button type="submit">
                {isLogin ? "Login" : "Create Account"}
              </Button>
            )}
            {isLoading && <p>Sending request...</p>}
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
}
