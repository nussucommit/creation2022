import React, { useState, useRef, useContext } from "react";

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
import TextField from "@mui/material/TextField";

import AuthContext from "../store/auth-context";
import { storage } from "../firebase/firebase";
import CustomSnackbar from "../components/Messages/CustomSnackbar";
import { validateInput } from "../validations/validate-input";

function Profile() {
  const authCtx = useContext(AuthContext);
  const isSignedIn = authCtx.isSignedIn;
  const [profilePhotoURL, setProfilePhotoURL] = useState(
    isSignedIn ? authCtx.user.photoURL : "./user_profile.png"
  );
  const [username, setUsername] = useState(
    isSignedIn ? authCtx.user.displayName : "user"
  );

  const usernameInputRef = useRef();
  const [enteredUsernameIsValid, setEnteredUsernameIsValid] = useState(false);
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
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

  const updateUsernameHandler = (event) => {
    event.preventDefault();

    setSubmitButtonClicked(true);

    const enteredUsername = usernameInputRef.current.value;
    const { usernameIsValid } = validateInput(
      enteredUsername,
      authCtx.user.email,
      "",
      "",
      true
    );

    setEnteredUsernameIsValid(usernameIsValid);

    if (!usernameIsValid) {
      return;
    }

    usernameInputRef.current.value = "";
    setUsername(enteredUsername);
    setShowSnackbar(true);
    authCtx.updateDisplayName(enteredUsername);
  };

  return (
    <>
      <h2>Hi there, {username}</h2>
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
          <CustomSnackbar message="Profile updated" severity="success" />
        )}
      </form>
      <form onSubmit={updateUsernameHandler}>
        <TextField
          error={submitButtonClicked && !enteredUsernameIsValid}
          fullWidth
          helperText="Tip: At least 5 to 20 characters"
          label="New Username"
          required
          variant="outlined"
          inputRef={usernameInputRef}
        />
        <Button type="submit" variant="contained">
          Change username
        </Button>
      </form>
    </>
  );
}

export default Profile;

const InvisibleInput = styled.input`
  display: none;
`;
