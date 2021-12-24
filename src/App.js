import { useContext } from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

import RaiderCrusaderTtf from "./fonts/raidercrusader.ttf";
import NovaFlatRegularTtf from "./fonts/NovaFlat-Regular.ttf";
import NavigationBar from "./components/Layout/NavigationBar";
import Announcement from "./pages/Announcement";
import Challenges from "./pages/Challenges";
import ChangePassword from "./pages/ChangePassword";
import Contact from "./pages/Contact";
import Faq from "./pages/Faq.jsx";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound.jsx";
import Rules from "./pages/Rules";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword";
import SignUp from "./pages/SignUp";
import Submission from "./pages/Submission";
import VerifyEmail from "./pages/VerifyEmail";
import AuthContext from "./store/auth-context";
import CustomSnackbar from "./components/Messages/CustomSnackbar";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: grey[300],
    },
    text: {
      primary: "#fff",
      secondary: grey[500],
    },
  },
  typography: {
    fontFamily: "Nova Flat, Raider Crusader",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: "Raider Crusader";
          src: local("raidercrusader"),
            url(${RaiderCrusaderTtf}) format("truetype");
          font-weight: normal;
        },
        @font-face {
          font-family: "Nova Flat";
          src: local("NovaFlat-Regular"),
            url(${NovaFlatRegularTtf}) format("truetype");
          font-weight: normal;
        }
      `,
    },
  },
});

/**
 * React app for Creation 2022 organized by NUSSU commIT.
 *
 * @version 1.0.0
 * @author [Desmond To](https://github.com/DesmondTo)
 */
function App() {
  const authCtx = useContext(AuthContext);

  const isSignedIn = authCtx.isSignedIn;
  const isVerified = authCtx.isVerified;

  return (
    <ThemeProvider theme={theme}>
      <NavigationBar />
      <CustomSnackbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/announcement" element={<Announcement />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/refresh" element={<Navigate to="/submission" />} />
        <Route
          path="/submission"
          element={
            isVerified ? (
              <Submission />
            ) : isSignedIn ? (
              <VerifyEmail />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/signin"
          element={isSignedIn ? <Navigate to="/home" /> : <SignIn />}
        />
        <Route
          path="/profile"
          element={isSignedIn ? <Profile /> : <Navigate to="/signin" />}
        />
        <Route
          path="/change-password"
          element={isSignedIn ? <ChangePassword /> : <Navigate to="/signin" />}
        />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/signup"
          element={isSignedIn ? <Navigate to="/home" /> : <SignUp />}
        />
        <Route
          path="/verify-email"
          element={isSignedIn ? <VerifyEmail /> : <Navigate to="/home" />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
