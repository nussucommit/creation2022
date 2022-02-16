import { useState, useContext } from "react";

import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";

import AuthContext from "../../store/auth-context";
import menuItems from "../../constants/Navigation/navbar_menu_items";
// import authMenuItems from "../../constants/Navigation/auth_menu_items";

function MobileMenuItems() {
  const authCtx = useContext(AuthContext);
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);

  const handleCloseNavMenu = () => setAnchorElNav(null);

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
              <Typography style={{ fontFamily: "Poppins", fontWeight: 400 }}>
                {pageTitle}
              </Typography>
            </MenuItem>
          );
        })}
        {/* {!authCtx.isSignedIn &&
          authMenuItems.map((item, index) => (
            <MenuItem key={index} component={NavLink} to={item.pageURL}>
              <Typography style={{ fontFamily: "Poppins", fontWeight: 400 }}>
                {item.pageTitle}
              </Typography>
            </MenuItem>
          ))} */}
      </Menu>
    </Box>
  );
}

export default MobileMenuItems;
