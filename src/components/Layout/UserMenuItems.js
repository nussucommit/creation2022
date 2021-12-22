import React, { useContext } from "react";

import { NavLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";

import AuthContext from "../../store/auth-context";

function UserMenuItems() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutHandler = () => {
    setAnchorElUser(null);
    authCtx.logout();
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          {isLoggedIn && (
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
          <Typography
            style={{ fontFamily: "Poppins", fontWeight: 400 }}
            textAlign="center"
          >
            Profile
          </Typography>
        </MenuItem>
        <Button color="primary" onClick={logoutHandler}>
          Log out
        </Button>
      </Menu>
    </Box>
  );
}

export default UserMenuItems;
