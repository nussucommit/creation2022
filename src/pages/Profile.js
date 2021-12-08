import { useRef, useContext } from "react";

import { useNavigate } from "react-router-dom";

import AuthContext from "../store/auth-context";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function Profile() {
  const navigate = useNavigate();
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    // Future improvement: add validation here
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
    ).then((res) => {
      // Assumption: Always succeed
      // Future improvement: Add handling of error here
      navigate("/home", { replace: true });
    });
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Enter Your New Password</Typography>
        <form onSubmit={submitHandler}>
          <TextField
            error={false}
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
