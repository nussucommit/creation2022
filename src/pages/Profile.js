import { useContext } from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import AuthContext from "../store/auth-context";

function Profile() {
  const authCtx = useContext(AuthContext);
  const isSignedIn = authCtx.isSignedIn;
  const profilePhotoURL = isSignedIn
    ? authCtx.user.photoURL
    : "./user_profile.png";

  return isSignedIn ? (
    <Avatar alt="User Profile Photo" src={profilePhotoURL} />
  ) : null;
}

export default Profile;
