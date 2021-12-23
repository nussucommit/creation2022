import { useState, useEffect, useContext } from "react";

import {
  collection,
  doc,
  getDocs,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";

import { db } from "../../firebase/firebase";
import SnackbarContext from "../../store/snackbar-context";

function AnnouncementList({ isAdmin }) {
  const snackbarCtx = useContext(SnackbarContext);
  const [announcementList, setAnnouncementList] = useState([]);

  const announcementIsEmpty = announcementList.length === 0;

  useEffect(() => {
    const announcementCollectionRef = collection(db, "announcements");
    const reorderedCollectionRef = query(
      announcementCollectionRef,
      orderBy("timestamp", "desc")
    );

    const getAnnouncements = async () => {
      const announcementData = await getDocs(reorderedCollectionRef);
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

  return announcementIsEmpty ? (
    <Typography variant="h5">
      There is no announcement at the moment...
    </Typography>
  ) : (
    announcementList.map((announcement) => (
      <Card key={announcement.id} raised sx={{ my: "2rem" }}>
        <CardHeader
          title={announcement.title}
          subheader={announcement.dateTime}
          action={
            isAdmin && (
              <IconButton onClick={() => deleteAnnouncement(announcement.id)}>
                <DeleteIcon />
              </IconButton>
            )
          }
        />
        <CardContent>
          <Typography paragraph>{announcement.detail}</Typography>
        </CardContent>
      </Card>
    ))
  );
}

export default AnnouncementList;
