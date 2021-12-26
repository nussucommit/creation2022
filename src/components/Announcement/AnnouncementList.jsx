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
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";

import { db } from "../../firebase/firebase-config";
import SnackbarContext from "../../store/snackbar-context";

const styles = {
  secondaryText: {
    color: "white",
    fontFamily: "Nova Flat",
    lineHeight: "40px",
  },
};

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
    <Container sx={{ width: "100%" }}>
      <Typography variant="h5" style={styles.secondaryText} textAlign="center">
        There is no announcement at the moment...
      </Typography>
    </Container>
  ) : (
    announcementList.map((announcement) => (
      <Card
        key={announcement.id}
        raised
        sx={{ my: "2rem" }}
        style={{ boxShadow: "0px 0px 10px #ffffff" }}
      >
        <CardHeader
          title={announcement.title}
          subheader={announcement.dateTime}
          titleTypographyProps={{ fontFamily: "Raider Crusader" }}
          action={
            isAdmin && (
              <IconButton onClick={() => deleteAnnouncement(announcement.id)}>
                <DeleteIcon />
              </IconButton>
            )
          }
        />
        {announcement.imageURL && (
          <CardMedia
            component="img"
            image={announcement.imageURL}
            alt="Announcement visual aid"
            sx={{
              px: "auto",
              width: "75%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
        )}
        <CardContent>
          <Typography
            paragraph
            sx={{
              fontFamily: "Nova Flat",
            }}
          >
            {announcement.detail}
          </Typography>
        </CardContent>
      </Card>
    ))
  );
}

export default AnnouncementList;
