import { useState, useRef, useContext } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import AuthContext from "../../store/auth-context";

export default function AuthForm({ isSignin }) {
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin] = useState(isSignin);
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    // optional: add validation here

    setIsLoading(true);

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
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        authCtx.login(data.idToken, expirationTime.toISOString());
        navigate('/home', { replace: true });
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Card raised>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {isSignin ? "Sign in to continue" : "Sign up to continue"}
        </Typography>
        <form onSubmit={submitHandler}>
          <TextField
            error={false}
            fullWidth
            helperText="Example: e1234567@u.nus.edu"
            label="NUS Email"
            required
            variant="outlined"
            inputRef={emailInputRef}
          />
          <TextField
            error={false}
            fullWidth
            label="Password"
            required
            type="password"
            variant="outlined"
            inputRef={passwordInputRef}
          />
          {/* {!isSignin && (
            <TextField
              error={false}
              fullWidth
              label="Confirm Password"
              required
              type="password"
              variant="outlined"
            />
          )} */}
          <CardActions>
            <Button component={NavLink} to={isSignin ? "/signup" : "/signin"}>
              {isSignin ? "Create new account" : "Login with existing account"}
            </Button>
          </CardActions>
          <CardActions>
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
