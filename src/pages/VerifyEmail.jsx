import { useContext } from "react";

import Button from "@mui/material/Button";

import AuthContext from "../store/auth-context";

import mail from "../images/Mail.png";

function VerifyEmail() {
  const authCtx = useContext(AuthContext);

  const sendVerificationEmailHandler = () => {
    authCtx.verifyEmail();
  };

  return (
    <div className="mainBody" style={{ height: "100vh" }}>
      <h1
        className="mainTitle challengeTitle"
        style={{ textShadow: "0px 0px 16px #fdf252" }}
      >
        Verifying Email
      </h1>
      <div
        style={{
          width: "70vw",
          maxWidth: "400px",
          margin: "5vw auto",
          fontFamily: "Nova Flat",
          color: "#fff",
          border: "2px #fff solid",
          padding: "2vw",
          borderRadius: "10px",
        }}
      >
        <div><strong>Take note that:</strong></div>
        <div>(1) You must verify your email first before submitting.</div>
        <br />
        <div>
          (2) After verifying your email, please
          <strong>
            {" "}
            log out and sign in again to access "Submission" page.{" "}
          </strong>
          Otherwise, you will not be able to select the challenge statement.
        </div>
      </div>
      <div style={{ margin: "30px auto", width: "285px" }}>
        <div style={{ float: "left", margin: "5px 20px 0 0" }}>
          <img src={mail} alt="mail" style={{ height: "25px" }} />
        </div>
        <Button
          variant="outlined"
          color="secondary"
          onClick={sendVerificationEmailHandler}
        >
          Send verification email
        </Button>
      </div>
    </div>
  );
}

export default VerifyEmail;
