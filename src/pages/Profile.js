import { useState, useRef, useContext } from "react";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";

import AuthContext from "../store/auth-context";
import SnackbarContext from "../store/snackbar-context";
import AvatarChooser from "../components/Input/AvatarChooser";
import InputTextField from "../components/Input/InputTextField";
import { storage } from "../firebase/firebase";
import { validateInput } from "../validations/validate-input";

function Profile() {
  /* ------------------------------ Context ------------------------------ */
  const authCtx = useContext(AuthContext);
  const snackbarCtx = useContext(SnackbarContext);

  /* ------------------------------ State ------------------------------ */
  const [profilePhotoURL, setProfilePhotoURL] = useState(authCtx.user.photoURL);
  const [username, setUsername] = useState(authCtx.user.displayName);
  const [enteredUsernameIsValid, setEnteredUsernameIsValid] = useState(false);
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);

  /* ------------------------------ Input Reference ------------------------------ */
  const usernameInputRef = useRef();

  /* ------------------------------ Method ------------------------------ */
  const uploadPhotoHandler = (event) => {
    event.preventDefault();

    const uploadedPhoto = event.target.files[0];
    if (!uploadedPhoto) {
      alert("No photo uploaded.");
      return;
    }

    const photoType = uploadedPhoto.name.split(".").pop();
    const validPhotoTypes = ["gif", "jpg", "png"];
    if (!validPhotoTypes.includes(photoType)) {
      alert("Photo type is invalid. Make sure it is jpg/png/gif.");
      return;
    }

    const userUID = authCtx.user.uid;
    const modifiedPhotoName = `profile_${userUID}.${photoType}`;
    const storageRef = ref(storage, `profiles/${modifiedPhotoName}`);

    uploadBytes(storageRef, uploadedPhoto).then(() => {
      getDownloadURL(storageRef).then((url) => {
        snackbarCtx.setSnackbar({ open: true, message: "Photo uploaded!" });
        authCtx.updateProfile({ photoURL: url });
        setProfilePhotoURL(url);
      });
    });
  };

  const updateProfileHandler = (event) => {
    event.preventDefault();

    setSubmitButtonClicked(true);

    const enteredUsername = usernameInputRef.current.value;
    const { usernameIsValid } = validateInput({ enteredUsername }, (message) =>
      snackbarCtx.setSnackbar({ open: true, message, type: "warning" })
    );

    setEnteredUsernameIsValid(usernameIsValid);

    if (!usernameIsValid) {
      return;
    }

    usernameInputRef.current.value = "";
    setUsername(enteredUsername);
    snackbarCtx.setSnackbar({ open: true, message: "Username updated!" });
    authCtx.updateProfile({ displayName: enteredUsername });
  };

  return (
    <Card raised>
      <CardHeader title={`Hi there, ${username}`} />
      <form onSubmit={updateProfileHandler}>
        <CardContent>
          <AvatarChooser src={profilePhotoURL} onChange={uploadPhotoHandler} />
          <InputTextField
            error={submitButtonClicked && !enteredUsernameIsValid}
            helperText="Tip: At least 5 to 20 characters without whitespace. Allowed symbols: A-Z, a-z, 0-9, _."
            label="New Username"
            inputRef={usernameInputRef}
          />
        </CardContent>
        <CardActions>
          <Button type="submit" variant="contained">
            Update username
          </Button>
        </CardActions>
      </form>
    </Card>
  );
}

export default Profile;
