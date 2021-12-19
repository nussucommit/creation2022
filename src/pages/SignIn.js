import AuthForm from "../components/Authentication/AuthForm";
import FormContainer from "../components/Input/FormContainer";

function SignIn() {
  return (
    <FormContainer>
      <AuthForm isSignin />
    </FormContainer>
  );
}

export default SignIn;
