import React, { useState } from "react";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  reauthenticateWithCredential,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from "firebase/auth";

import { auth, emailProvider } from "../firebase/firebase";

const AuthContext = React.createContext({
  user: {},
  isSignedIn: false,
  isVerified: false,
  resetPasswordByEmail: () => {},
  signup: () => {},
  signin: () => {},
  signout: () => {},
  updatePassword: () => {},
  verifyEmail: () => {},
});

export const AuthContextProvider = (props) => {
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
      alert(error.message);
    }
  };

  const signupHandler = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(error.message);
    }
  };

  const signinHandler = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(error.message);
    }
  };

  const signoutHandler = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      alert(error.message);
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

      await reauthenticateWithCredential(user, credential).then( async () =>
        await updatePassword(user, newPassword)
          .then(signoutHandler)
          .catch((error) => {
            throw new Error(error);
          })
      );
    } catch (error) {
      alert(error.message);
    }
  };

  const verifyEmailHandler = async () => {
    try {
      const actionCodeSettings = {
        url: "http://localhost:3000/submission",
      };
      await sendEmailVerification(user, actionCodeSettings);
    } catch (error) {
      alert(error.message);
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
    verifyEmail: verifyEmailHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
