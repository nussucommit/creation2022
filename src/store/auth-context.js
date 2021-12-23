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

import { auth, emailProvider } from "../firebase/firebase-config";
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

  const setSnackbar = (message, type) =>
    snackbarCtx.setSnackbar({
      open: true,
      message: message,
      type: type,
    });

  onAuthStateChanged(auth, (currentUser) => setUser(currentUser));

  const resetPasswordByEmailHandler = async (email) => {
    try {
      const actionCodeSettings = {
        url: "http://creation2022.nussucommit.com/signin",
      };
      await sendPasswordResetEmail(auth, email, actionCodeSettings).then(
        setSnackbar("Password reset email sent!", "success")
      );
    } catch (error) {
      setSnackbar(error.message, "error");
    }
  };

  const signupHandler = async (username, email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        async () =>
          await updateProfile(auth.currentUser, { displayName: username }).then(
            setSnackbar("Account created!", "success")
          )
      );
    } catch (error) {
      setSnackbar(error.message, "error");
    }
  };

  const signinHandler = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const username = auth.currentUser.displayName;
      setSnackbar(`Welcome back, ${username}!`, "success");
    } catch (error) {
      setSnackbar(error.message, "error");
    }
  };

  const signoutHandler = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      setSnackbar(error.message, "error");
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

      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword).then(
        setSnackbar(
          "Password updated! Please sign in again using the new password.",
          "success"
        )
      );
      signoutHandler();
    } catch (error) {
      setSnackbar(error.message, "error");
    }
  };

  const updateProfileHandler = async (newProfile) => {
    try {
      await updateProfile(auth.currentUser, newProfile);
    } catch (error) {
      setSnackbar(error.message, "error");
    }
  };

  const verifyEmailHandler = async () => {
    try {
      const actionCodeSettings = {
        url: "http://creation2022.nussucommit.com/submission",
      };
      await sendEmailVerification(user, actionCodeSettings).then(
        setSnackbar(
          "Verification email sent! Please check your mailbox.",
          "success"
        )
      );
    } catch (error) {
      setSnackbar(error.message, "error");
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
