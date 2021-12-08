import React from "react";

import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

import menuItems from "../../constants/Navigation/NavBarMenuItems";

export default function MobileMenuItems() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        {menuItems.map((page) => {
          const { pageTitle, pageURL } = page;

          return (
            <MenuItem
              key={pageTitle}
              component={NavLink}
              to={pageURL}
              onClick={handleCloseNavMenu}
            >
              <Typography textAlign="center">{pageTitle}</Typography>
            </MenuItem>
          );
        })}
        <MenuItem component={NavLink} to="/signin">
          <Typography textAlign="center">Sign in</Typography>
        </MenuItem>
        <MenuItem component={NavLink} to="/signup">
          <Typography textAlign="center">Sign up</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
