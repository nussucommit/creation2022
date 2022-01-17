import AuthForm from "../components/Authentication/AuthForm";
import FormContainer from "../components/Container/FormContainer";

function SignIn() {
  return (
    <FormContainer className="mainContent"
      childComponents={[
        <h1
          className={"mainTitle"}
          style={{ textShadow: "0px 0px 16px #B0B0B0" }}
        >
          Sign in to continue
        </h1>,
        <AuthForm isSignin />,
      ]}
    />
  );
}

export default SignIn;
