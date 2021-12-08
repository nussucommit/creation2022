import { useRef } from "react";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function Profile() {
  const newPasswordInputRef = useRef();

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Enter Your New Password</Typography>
        <form>
          <TextField
            error={false}
            fullWidth
            label="New Password"
            required
            variant="outlined"
            inputRef={newPasswordInputRef}
          />
        </form>
        <CardActions>
          <Button>Change Password</Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
