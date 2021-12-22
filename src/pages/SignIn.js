import Typography from "@mui/material/Typography";

import AuthForm from "../components/Authentication/AuthForm";
import FormContainer from "../components/Container/FormContainer";

function SignIn() {
  return (
    <FormContainer
      childComponents={[
        <Typography variant="h4">Sign in to continue</Typography>,
        <AuthForm isSignin />,
      ]}
    />
  );
}

export default SignIn;
