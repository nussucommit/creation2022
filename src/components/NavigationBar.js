import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router-dom";

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

const AccountMenuItems = [
  {
    pageTitle: "Sign In",
    pageURL: "/signin",
  },
  {
    pageTitle: "Sign Up",
    pageURL: "/signup",
  },
];

export default function NavigationBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={NavLink}
            to="/home"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            CREATION 2022
          </Typography>

          <Typography
            variant="h6"
            noWrap
            component={NavLink}
            to="/home"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            CREATION 2022
          </Typography>
          <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
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
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
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
            </Menu>
          </Box>
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

          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            {AccountMenuItems.map((page) => {
              const { pageTitle, pageURL } = page;

              return (
                <MenuItem key={pageTitle} component={NavLink} to={pageURL}>
                  <Typography textAlign="center">{pageTitle}</Typography>
                </MenuItem>
              );
            })}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
