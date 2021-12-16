import React, { useState, useRef, useContext } from "react";

import styled from "styled-components";
import {
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
  const [profilePhotoURL, setProfilePhotoURL] = useState(authCtx.user.photoURL);
  const [username, setUsername] = useState(authCtx.user.displayName);

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

    const modifiedFileName = authCtx.user.uid
      .concat(".")
      .concat(file.name.split(".").pop());

    const storageRef = ref(storage, `profiles/${modifiedFileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => alert(error.message),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          authCtx.updateProfile({photoURL: url});
          setProfilePhotoURL(url);
          setShowSnackbar(true);
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
    authCtx.updateProfile({displayName: enteredUsername});
  };

  return (
    <>
      <h2>Hi there, {username}</h2>
      <Avatar alt="User Profile Photo" src={profilePhotoURL} />
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
