import { NavLink } from "react-router-dom";
import Typography from "@mui/material/Typography";

export default function ResponsiveLogoLink({ isDesktop }) {
  return (
    <Typography
      style={{ fontFamily: "Poppins", fontWeight: 600, textDecoration: "none" }}
      variant="h6"
      color="#FFF"
      noWrap
      component={NavLink}
      to="/home"
      sx={
        isDesktop
          ? { mr: 2, display: { xs: "none", md: "flex" } }
          : { flexGrow: 1, display: { xs: "flex", md: "none" } }
      }
    >
      CREATION 2022
    </Typography>
  );
}
