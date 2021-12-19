import AuthForm from "../components/Authentication/AuthForm";
import FormContainer from "../components/Input/FormContainer";

function SignUp() {
  return (
    <FormContainer>
      <AuthForm isSignin={false} />
    </FormContainer>
  );
}

export default SignUp;
