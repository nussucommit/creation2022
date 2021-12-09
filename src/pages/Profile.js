import { useRef, useState, useContext } from "react";

import { useNavigate } from "react-router-dom";

import AuthContext from "../store/auth-context";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import validateInput from "../validations/InputValidation";
import inputPatterns from "../constants/Authentication/InputPatterns";

export default function Profile() {
  const navigate = useNavigate();
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const [enteredNewPasswordIsValid, setEnteredNewPasswordIsValid] =
    useState(false);
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    setSubmitButtonClicked(true);

    const newPasswordIsValid = validateInput(
      enteredNewPassword,
      inputPatterns["password"],
      "The password must have minimum eight characters, at least one letter and one number!"
    );

    newPasswordIsValid
      ? setEnteredNewPasswordIsValid(true)
      : setEnteredNewPasswordIsValid(false);

    if (!newPasswordIsValid) {
      return;
    }

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBuRBQUOL9pRCG_uAPC6c-CBibziO4f7-w",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Password changing failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            // Future improvement: using a snackbar instead
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        authCtx.logout();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Enter Your New Password</Typography>
        <form onSubmit={submitHandler}>
          <TextField
            error={submitButtonClicked && !enteredNewPasswordIsValid}
            fullWidth
            label="New Password"
            required
            type="password"
            variant="outlined"
            inputRef={newPasswordInputRef}
          />
          <CardActions>
            <Button type="submit" variant="outlined">
              Change Password
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
}
