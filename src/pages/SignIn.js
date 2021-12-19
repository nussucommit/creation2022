import AuthForm from "../components/Authentication/AuthForm";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

export default function SignIn() {
  return (
    <Container maxWidth="sm">
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={11} sm={8}>
          <AuthForm isSignin />
        </Grid>
      </Grid>
    </Container>
  );
}
