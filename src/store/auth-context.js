import React, { useState } from "react";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  updateProfile,
} from "firebase/auth";

import { auth, emailProvider } from "../firebase/firebase";

const AuthContext = React.createContext({
  user: {},
  isSignedIn: false,
  signup: () => {},
  signin: () => {},
  signout: () => {},
  updatePassword: () => {},
  updateProfile: () => {},
});

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const userIsSignedIn = !!user;

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

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
      reauthenticateWithCredential(user, credential).then(async () => {
        await updatePassword(user, newPassword).then(() => signoutHandler());
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const updateProfileHandler = (newDisplayName) => {
    try {
      updateProfile(user, { displayName: newDisplayName});
    } catch (error) {
      alert(error.message);
    }
  };

  const contextValue = {
    user: user,
    isSignedIn: userIsSignedIn,
    signup: signupHandler,
    signin: signinHandler,
    signout: signoutHandler,
    updatePassword: updatePasswordHandler,
    updateProfile: updateProfileHandler
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
