import { createContext, useContext, useState } from "react";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  reauthenticateWithCredential,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  updateProfile,
} from "firebase/auth";

import { auth, emailProvider } from "../firebase/firebase";
import SnackbarContext from "../store/snackbar-context";

const AuthContext = createContext({
  user: {},
  isSignedIn: false,
  isVerified: false,
  resetPasswordByEmail: () => {},
  signup: () => {},
  signin: () => {},
  signout: () => {},
  updatePassword: () => {},
  updateProfile: () => {},
  verifyEmail: () => {},
});

export const AuthContextProvider = (props) => {
  const snackbarCtx = useContext(SnackbarContext);
  const [user, setUser] = useState(null);
  const userIsSignedIn = !!user;
  const userIsVerified = userIsSignedIn && user.emailVerified;

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const resetPasswordByEmailHandler = async (email) => {
    try {
      const actionCodeSettings = {
        url: "http://localhost:3000/sign-in",
      };
      await sendPasswordResetEmail(auth, email, actionCodeSettings);
    } catch (error) {
      snackbarCtx.setSnackbar({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  const signupHandler = async (username, email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        async () => {
          await updateProfileHandler({
            displayName: username,
          });
        }
      );
    } catch (error) {
      snackbarCtx.setSnackbar({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  const signinHandler = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      snackbarCtx.setSnackbar({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  const signoutHandler = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      snackbarCtx.setSnackbar({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  const updatePasswordHandler = async (
    currentEmail,
    currentPassword,
    newPassword
  ) => {
    try {
      const credential = emailProvider.credential(
        currentEmail,
        currentPassword
      );

      await reauthenticateWithCredential(user, credential).then(
        async () =>
          await updatePassword(user, newPassword)
            .then(signoutHandler)
            .catch((error) => {
              throw new Error(error);
            })
      );
    } catch (error) {
      snackbarCtx.setSnackbar({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  const updateProfileHandler = async (newProfile) => {
    try {
      await updateProfile(auth.currentUser, newProfile);
    } catch (error) {
      snackbarCtx.setSnackbar({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  const verifyEmailHandler = async () => {
    try {
      const actionCodeSettings = {
        url: "http://localhost:3000/submission",
      };
      await sendEmailVerification(user, actionCodeSettings);
    } catch (error) {
      snackbarCtx.setSnackbar({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  const contextValue = {
    user: user,
    isSignedIn: userIsSignedIn,
    isVerified: userIsVerified,
    resetPasswordByEmail: resetPasswordByEmailHandler,
    signup: signupHandler,
    signin: signinHandler,
    signout: signoutHandler,
    updatePassword: updatePasswordHandler,
    updateProfile: updateProfileHandler,
    verifyEmail: verifyEmailHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
