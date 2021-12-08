import React, { useContext } from "react";

import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

import AuthContext from "../../store/auth-context";

function RightMenuItems() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return isLoggedIn ? null : (
    <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
      <MenuItem component={NavLink} to="/signin">
        <Typography textAlign="center">Sign in</Typography>
      </MenuItem>
      <Button
        variant="outlined"
        color="secondary"
        component={NavLink}
        to="/signup"
      >
        Sign Up
      </Button>
    </Box>
  );
}

export default RightMenuItems;
