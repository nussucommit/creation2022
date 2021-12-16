import React, { useState, useContext } from "react";

import styled from "styled-components";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import AuthContext from "../store/auth-context";
import { storage } from "../firebase/firebase";
import CustomSnackbar from "../components/Messages/CustomSnackbar";

function Profile() {
  const authCtx = useContext(AuthContext);
  const isSignedIn = authCtx.isSignedIn;
  const [profilePhotoURL, setProfilePhotoURL] = useState(
    isSignedIn ? authCtx.user.photoURL : "./user_profile.png"
  );
  const [showSnackbar, setShowSnackbar] = useState(false);

  const uploadPhotoHandler = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    uploadFile(file);
  };

  const uploadFile = (file) => {
    if (!file) {
      return;
    }
    const storageRef = ref(storage, `profiles/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    const currentPhotoStorageRef = ref(storage, profilePhotoURL);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => alert(error.message),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          authCtx.updateProfilePhoto(url);
          deleteObject(currentPhotoStorageRef);
          setShowSnackbar(true);
          setProfilePhotoURL(url);
        });
      }
    );
  };

  return (
    <>
      {isSignedIn && <Avatar alt="User Profile Photo" src={profilePhotoURL} />}
      <form>
        <label htmlFor="contained-button-profile-photo">
          <InvisibleInput
            accept="image/*"
            id="contained-button-profile-photo"
            type="file"
            onChange={uploadPhotoHandler}
          />
          <Button
            component="span"
            variant="contained"
            endIcon={<PhotoCamera />}
          >
            Change profile picture
          </Button>
        </label>
        {showSnackbar && (
          <CustomSnackbar message="Profile photo updated" severity="success" />
        )}
      </form>
    </>
  );
}

export default Profile;

const InvisibleInput = styled.input`
  display: none;
`;
