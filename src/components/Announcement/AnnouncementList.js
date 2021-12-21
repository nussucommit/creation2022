import { useState, useEffect, useContext } from "react";

import { collection, doc, getDocs, deleteDoc } from "firebase/firestore";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import { db } from "../../firebase/firebase";
import SnackbarContext from "../../store/snackbar-context";

function AnnouncementList({ isAdmin }) {
  const snackbarCtx = useContext(SnackbarContext);
  const [announcementList, setAnnouncementList] = useState([]);

  const announcementIsEmpty = announcementList.length === 0;

  useEffect(() => {
    const announcementCollectionRef = collection(db, "announcements");

    const getAnnouncements = async () => {
      const announcementData = await getDocs(announcementCollectionRef);
      setAnnouncementList(
        announcementData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    getAnnouncements();
  }, []);

  const setSnackbar = (message, type) =>
    snackbarCtx.setSnackbar({
      open: true,
      message,
      type,
    });

  const deleteAnnouncement = async (id) => {
    const announcementDoc = doc(db, "announcements", id);
    await deleteDoc(announcementDoc)
      .then(setSnackbar("Announcement deleted", "success"))
      .catch((error) => setSnackbar(error.message, "error"));
  };

  return (
    <Card>
      <CardHeader title="Creation 2022 Announcement Page" />
      <CardContent>
        {announcementIsEmpty && "There is no announcement at the moment..."}
        {!announcementIsEmpty &&
          announcementList.map((announcement) => {
            return (
              <Paper
                key={announcement.id}
                variant="outlined"
                sx={{ m: "2rem", p: "1rem" }}
              >
                {isAdmin && (
                  <IconButton
                    onClick={() => deleteAnnouncement(announcement.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
                <Typography variant="h5" component="div">
                  {announcement.title}
                </Typography>
                <Typography paragraph color="text.secondary">
                  {announcement.dateTime}
                </Typography>
                <Typography paragraph>{announcement.detail}</Typography>
              </Paper>
            );
          })}
      </CardContent>
    </Card>
  );
}

export default AnnouncementList;
