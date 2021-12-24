import AuthForm from "../components/Authentication/AuthForm";
import FormContainer from "../components/Container/FormContainer";

function SignUp() {
  return (
    <FormContainer
      childComponents={[
        <h1
          className={"mainTitle"}
          style={{ textShadow: "0px 0px 16px #B0B0B0" }}
        >
          Sign up to continue
        </h1>,
        <AuthForm isSignin={false} />,
      ]}
    />
  );
}

export default SignUp;
