import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function AuthForm({ isSignin }) {
  return (
    <Card raised>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {isSignin ? "Sign in to continue" : "Sign up to continue"}
        </Typography>
        <form>
          <TextField
            error={false}
            fullWidth
            helperText="Example: e1234567@u.nus.edu"
            label="NUS Email"
            variant="outlined"
          />
          <TextField
            error={false}
            fullWidth
            label="Password"
            helperText="At least 7 characters"
            variant="outlined"
          />
        </form>
      </CardContent>
      <CardActions>
        <Button>
          {isSignin ? "Create new account" : "Login with existing account"}
        </Button>
      </CardActions>
      <CardActions>
        <Button>{isSignin ? "Login" : "Create Account"}</Button>
      </CardActions>
    </Card>
  );
}
