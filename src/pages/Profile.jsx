import { useState, useRef, useContext } from "react";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

import { storage } from "../firebase/firebase-config";
import { validateInput } from "../validations/validate-input";
import AuthContext from "../store/auth-context";
import SnackbarContext from "../store/snackbar-context";
import FormContainer from "../components/Container/FormContainer";
import AvatarChooser from "../components/Input/AvatarChooser";
import InputTextField from "../components/Input/InputTextField";
import CVSubmissionNote from "../components/Input/CVSubmissionNote";
import Agreement from "../components/Authentication/Agreement";

function Profile() {
  /* ------------------------------ Context ------------------------------ */
  const authCtx = useContext(AuthContext);
  const snackbarCtx = useContext(SnackbarContext);

  /* ------------------------------ State ------------------------------ */
  const [profilePhotoURL, setProfilePhotoURL] = useState(authCtx.user.photoURL);
  const [username, setUsername] = useState(authCtx.user.displayName);
  const [enteredUsernameIsValid, setEnteredUsernameIsValid] = useState(false);
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
  const [openAgreement, setOpenAgreement] = useState(false);

  /* ------------------------------ Input Reference ------------------------------ */
  const usernameInputRef = useRef();

  /* ------------------------------ Method ------------------------------ */
  const closeAgreementHandler = () => setOpenAgreement(false);

  const toggleOpenAgreementHandler = () =>
    setOpenAgreement((openAgreement) => !openAgreement);

  const setSnackbar = (message, type) =>
    snackbarCtx.setSnackbar({
      open: true,
      message,
      type,
    });

  const uploadPhotoHandler = (event) => {
    event.preventDefault();

    const uploadedPhoto = event.target.files[0];
    if (!uploadedPhoto) {
      setSnackbar("No photo chosen!", "error");
      return;
    }

    const photoType = uploadedPhoto.name.split(".").pop();
    const validPhotoTypes = ["gif", "jpg", "png"];
    if (!validPhotoTypes.includes(photoType)) {
      setSnackbar(
        "Photo type is invalid. Make sure it is jpg/png/gif.",
        "error"
      );
      return;
    }

    const userUID = authCtx.user.uid;
    const modifiedPhotoName = `profile_${userUID}.${photoType}`;
    const storageRef = ref(storage, `profiles/${modifiedPhotoName}`);

    uploadBytes(storageRef, uploadedPhoto).then(() => {
      getDownloadURL(storageRef).then((url) => {
        setSnackbar("Photo uploaded!", "success");
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
      setSnackbar(message, "warning")
    );

    setEnteredUsernameIsValid(usernameIsValid);

    if (!usernameIsValid) {
      return;
    }

    usernameInputRef.current.value = "";
    setUsername(enteredUsername);
    setSnackbar("Your name is updated!", "success");
    authCtx.updateProfile({ displayName: enteredUsername });
  };

  return (
    <FormContainer
      childComponents={[
        <h1
          className="mainTitle"
          style={{ textShadow: "0px 0px 16px #B0B0B0" }}
        >
          {`Hi there, ${username}`}
        </h1>,
        <AvatarChooser src={profilePhotoURL} onChange={uploadPhotoHandler} />,
        <CVSubmissionNote onToggleOpenAgreement={toggleOpenAgreementHandler} />,
        <form onSubmit={updateProfileHandler}>
          <CardContent>
            <InputTextField
              error={submitButtonClicked && !enteredUsernameIsValid}
              helperText="Tip: At least 3 characters."
              placeholder="My Full Name"
              icon={<AccountCircleOutlinedIcon />}
              inputRef={usernameInputRef}
            />
          </CardContent>
          <CardActions>
            <Button type="submit" variant="contained" fullWidth>
              Update my full name
            </Button>
          </CardActions>
        </form>,
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openAgreement}
        >
          <Agreement onClose={closeAgreementHandler} />
        </Backdrop>,
      ]}
    />
  );
}

export default Profile;
