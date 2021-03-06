import { useState, useContext } from "react";

import { NavLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import AuthContext from "../../store/auth-context";

function UserMenuItems() {
  const authCtx = useContext(AuthContext);
  const isSignedIn = authCtx.isSignedIn;

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);

  const handleCloseUserMenu = () => setAnchorElUser(null);

  const signoutHandler = () => {
    setAnchorElUser(null);
    authCtx.signout();
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          {isSignedIn && (
            <Avatar alt="User Profile Photo" src={authCtx.user.photoURL} />
          )}
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem
          component={NavLink}
          to="/profile"
          onClick={handleCloseUserMenu}
        >
          <Typography style={{ fontFamily: "Poppins" }}>Profile</Typography>
        </MenuItem>
        <MenuItem
          component={NavLink}
          to="/change-password"
          onClick={handleCloseUserMenu}
        >
          <Typography sx={{ fontFamily: "Poppins" }}>
            Change password
          </Typography>
        </MenuItem>
        <MenuItem onClick={signoutHandler}>
          <Typography sx={{ fontFamily: "Poppins" }}>Log out</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default UserMenuItems;
