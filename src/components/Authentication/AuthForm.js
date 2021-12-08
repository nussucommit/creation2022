import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";

export default function AuthForm() {
  return (
    <Card raised>
      <CardContent>
        <form>
          <TextField
            error={false}
            fullWidth
            helperText="e1234567@u.nus.edu"
            label="NUS Email"
            variant="outlined"
          />
          <TextField
            error={false}
            fullWidth
            label="Password"
            variant="outlined"
          />
        </form>
      </CardContent>
      <CardActions>
        <Button>Create new account</Button>
        <Button>Login</Button>
      </CardActions>
    </Card>
  );
}
