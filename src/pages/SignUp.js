import Typography from "@mui/material/Typography";

import AuthForm from "../components/Authentication/AuthForm";
import FormContainer from "../components/Container/FormContainer";

function SignUp() {
  return (
    <FormContainer
      childComponents={[
        <Typography variant="h4">Sign up to continue</Typography>,
        <AuthForm isSignin={false} />,
      ]}
    />
  );
}

export default SignUp;
