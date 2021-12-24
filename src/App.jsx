import React, { Suspense, useContext } from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";

import RaiderCrusaderTtf from "./fonts/raidercrusader.ttf";
import NovaFlatRegularTtf from "./fonts/NovaFlat-Regular.ttf";
import AuthContext from "./store/auth-context";
import CustomSnackbar from "./components/Messages/CustomSnackbar";
import NavigationBar from "./components/Layout/NavigationBar";

const Announcement = React.lazy(() => import("./pages/Announcement"));
const Challenges = React.lazy(() => import("./pages/Challenges"));
const ChangePassword = React.lazy(() => import("./pages/ChangePassword"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Faq = React.lazy(() => import("./pages/Faq"));
const Home = React.lazy(() => import("./pages/Home"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Profile = React.lazy(() => import("./pages/Profile"));
const Rules = React.lazy(() => import("./pages/Rules"));
const ResetPassword = React.lazy(() => import("./pages/ResetPassword"));
const SignIn = React.lazy(() => import("./pages/SignIn"));
const SignUp = React.lazy(() => import("./pages/SignUp"));
const Submission = React.lazy(() => import("./pages/Submission"));
const VerifyEmail = React.lazy(() => import("./pages/VerifyEmail"));

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
      <Suspense
        fallback={
          <Centered className="mainBody">
            <CircularProgress />
          </Centered>
        }
      >
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
            element={
              isSignedIn ? <ChangePassword /> : <Navigate to="/signin" />
            }
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
      </Suspense>
    </ThemeProvider>
  );
}

export default App;

const Centered = styled.div`
  flex: 9;
  display: flex;
  justify-content: center;
  align-items: center;
`;
