import { useContext } from "react";

import Button from "@mui/material/Button";

import AuthContext from "../store/auth-context";

function VerifyEmail() {
  const authCtx = useContext(AuthContext);

  const sendVerificationEmailHandler = () => {
    authCtx.verifyEmail();
  };

  return (
    <div>
      <h2>
        You must verify your email first before submitting. Reload and access
        "submission" page again after verifying your email.
      </h2>
      <Button variant="contained" onClick={sendVerificationEmailHandler}>
        Send verification email
      </Button>
    </div>
  );
}

export default VerifyEmail;
