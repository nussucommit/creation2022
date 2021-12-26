import { useState, useRef, useContext } from "react";

import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";

import { db, storage } from "../../firebase/firebase-config";
import { getTimestamp, getDateTime } from "../../helpers/date-time-getter";
import SnackbarContext from "../../store/snackbar-context";

function AddAnnouncement({ isAdmin }) {
  const snackbarCtx = useContext(SnackbarContext);
  const [imageFile, setImageFile] = useState(null);

  const titleInputRef = useRef();
  const detailInputRef = useRef();

  const announcementCollectionRef = collection(db, "announcements");

  const setSnackbar = (message, type) =>
    snackbarCtx.setSnackbar({
      open: true,
      message,
      type,
    });

  const uploadHandler = (event) => {
    event.preventDefault();

    setImageFile(event.target.files[0]);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredDetail = detailInputRef.current.value;
    const currentTimestamp = getTimestamp();
    const postDateTime = getDateTime(currentTimestamp);

    const imageChosen = !!imageFile;

    if (imageChosen) {
      const modifiedImageName = `announcement_${postDateTime}`;
      const imageStorageLocation = `announcements/${modifiedImageName}`;
      const imageStorageRef = ref(storage, imageStorageLocation);
      await uploadBytes(imageStorageRef, imageFile);
      getDownloadURL(imageStorageRef)
        .then(async (imageURL) => {
          await addDoc(announcementCollectionRef, {
            title: enteredTitle,
            timestamp: currentTimestamp,
            dateTime: getDateTime(currentTimestamp),
            detail: enteredDetail,
            imageURL,
          });
        })
        .then(() => setSnackbar("Announcement posted", "success"))
        .then(() => {
          titleInputRef.current.value = "";
          detailInputRef.current.value = "";
        })
        .catch((error) => setSnackbar(error.message, "error"));
    } else {
      await addDoc(announcementCollectionRef, {
        title: enteredTitle,
        timestamp: currentTimestamp,
        dateTime: getDateTime(currentTimestamp),
        detail: enteredDetail,
      })
        .then(() => setSnackbar("Announcement posted", "success"))
        .then(() => {
          titleInputRef.current.value = "";
          detailInputRef.current.value = "";
        })
        .catch((error) => setSnackbar(error.message, "error"));
    }
  };

  return isAdmin ? (
    <Card raised>
      <form onSubmit={submitHandler}>
        <CardHeader title="Add your announcement here" />
        <CardContent>
          <TextField
            label="Title"
            variant="standard"
            required
            fullWidth
            inputRef={titleInputRef}
          />
          <TextField
            label="Detail"
            variant="standard"
            required
            fullWidth
            multiline
            inputRef={detailInputRef}
          />
          <Input
            inputProps={{ accept: "image/*", multiple: true }}
            type="file"
            onChange={uploadHandler}
            disableUnderline
            sx={{ my: "1rem" }}
          />
        </CardContent>
        <CardActions>
          <Button type="submit" variant="contained" fullWidth>
            Submit
          </Button>
        </CardActions>
      </form>
    </Card>
  ) : null;
}

export default AddAnnouncement;
