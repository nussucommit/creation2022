import React, { useContext } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router-dom";

import AuthContext from "../store/auth-context";

const menuItems = [
  {
    pageTitle: "Announcement",
    pageURL: "/announcement",
  },
  {
    pageTitle: "Challenges",
    pageURL: "/challenges",
  },
  {
    pageTitle: "Rules",
    pageURL: "/rules",
  },
  {
    pageTitle: "Submission",
    pageURL: "/submission",
  },
  {
    pageTitle: "FAQ",
    pageURL: "/faq",
  },
  {
    pageTitle: "Contact",
    pageURL: "/contact",
  },
];

export default function NavigationBar() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutHandler = () => {
    setAnchorElUser(null);
    authCtx.logout();
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            color="secondary"
            noWrap
            component={NavLink}
            to="/home"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            CREATION 2022
          </Typography>
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
          <Typography
            variant="h6"
            color="secondary"
            noWrap
            component={NavLink}
            to="/home"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            CREATION 2022
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {menuItems.map((page) => {
              const { pageTitle, pageURL } = page;

              return (
                <MenuItem key={pageTitle} component={NavLink} to={pageURL}>
                  <Typography textAlign="center">{pageTitle}</Typography>
                </MenuItem>
              );
            })}
          </Box>
          {!isLoggedIn && (
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
          )}
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
              <MenuItem component={NavLink} to="/profile">
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <Button color="primary" onClick={logoutHandler}>
                Log out
              </Button>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
