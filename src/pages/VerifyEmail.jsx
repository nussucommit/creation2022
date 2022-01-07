import { useContext } from "react";

import Button from "@mui/material/Button";

import AuthContext from "../store/auth-context";

import mail from "../images/Mail.png"

function VerifyEmail() {
  const authCtx = useContext(AuthContext);

  const sendVerificationEmailHandler = () => {
    authCtx.verifyEmail();
  };

  return (
    <div className="mainBody" style={{height:"100vh"}}>
      <h1 className='mainTitle challengeTitle' style={{ textShadow: "0px 0px 16px #fdf252" }}>Verifying Email</h1>
      <div style={{width:'70vw',maxWidth:'800px',margin:'20px auto',fontFamily:'Nova Flat',color:'#fff',border:'2px #fff solid',padding:'2vw',borderRadius:'10px'}}>
        <div>
          You must verify your email first before submitting.
        </div>
        <br/>
        <div>
          Reload and access "submission" page again after verifying your email.
        </div>
      </div>
      <div style={{margin:'30px auto',width:'70vw',maxWidth:'800px'}}>

        <Button variant="contained" color="secondary" onClick={sendVerificationEmailHandler} style={{width:'70vw',maxWidth:'800px'}}>
          <img src={mail} alt="mail" style={{height:'25px',marginRight:'10px'}}/>Send verification email
        </Button>
      </div>
    </div>
  );
}

export default VerifyEmail;
