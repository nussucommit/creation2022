import React from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";

import DesktopMenuItems from "./DesktopMenuItems";
import MobileMenuItems from "./MobileMenuItems";
import ResponsiveLogoLink from "./ResponsiveLogoLink";
import RightMenuItems from "./RightMenuItems";
import UserMenuItems from "./UserMenuItems";

function NavigationBar() {
  return (
    <AppBar
      position="static"
      style={{
        backgroundColor: '#323232',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ResponsiveLogoLink isDesktop />
          <DesktopMenuItems />
          <MobileMenuItems />
          <ResponsiveLogoLink isDesktop={false} />
          <RightMenuItems />
          <UserMenuItems />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default React.memo(NavigationBar);
