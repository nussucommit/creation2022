import { useRef, useContext } from "react";

import { collection, addDoc } from "firebase/firestore";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import TextField from "@mui/material/TextField";

import SnackbarContext from "../../store/snackbar-context";
import { db } from "../../firebase/firebase";
import { getTimestamp, getDateTime } from "../../helpers/date-time-getter";

function AddAnnouncement({ isAdmin }) {
  const snackbarCtx = useContext(SnackbarContext);
  const announcementCollectionRef = collection(db, "announcements");

  const titleInputRef = useRef();
  const detailInputRef = useRef();

  const setSnackbar = (message, type) =>
    snackbarCtx.setSnackbar({
      open: true,
      message,
      type,
    });

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredDetail = detailInputRef.current.value;
    const currentTimestamp = getTimestamp();

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
