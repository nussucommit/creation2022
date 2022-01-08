import React, { useContext, useState, useEffect } from "react";

import {
  collection,
  doc,
  getDocs,
  deleteDoc,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { deleteObject, ref } from "firebase/storage";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";

import { db, storage } from "../../firebase/firebase-config";
import AuthContext from "../../store/auth-context";
import SnackbarContext from "../../store/snackbar-context";

const styles = {
  media: {
    width: "25%",
  },
};

const challengeStatements = [
  "Key Visual for NUS Commencement Class Giving 2023",
  "Digital Poster for Phishing via Email, Calls and SMS",
  "Digital Poster for Business Email Compromise",
  "Digital Poster to Raise Awareness of Ransomware",
];

function SubmittedFileList() {
  const authCtx = useContext(AuthContext);
  const snackbarCtx = useContext(SnackbarContext);

  const navigate = useNavigate();
  const [challengeSubmission, setChallengeSubmission] = useState([]);

  const userUID = authCtx.user.uid;
  const SNACKBAR_MESSAGE_SUCCESS_DELETE = "File successfully deleted!";

  useEffect(() => {
    const challengeIndexes = [1, 2, 3, 4];
    const challengePaths = challengeIndexes.map(
      (index) => `submissions/challenges/challenge${index}`
    );
    const challengeRefs = challengePaths.map((path) =>
      query(
        collection(db, path),
        orderBy("timestamp", "desc"),
        where("uid", "==", userUID)
      )
    );
    const getSubmittedFiles = () => {
      challengeRefs.map(async (ref) => {
        const challengeData = await getDocs(ref);
        const docIsEmpty = challengeData.docs.length === 0;
        if (!docIsEmpty) {
          setChallengeSubmission((prev) => [
            ...prev,
            challengeData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0],
          ]);
        }
      });
    };

    getSubmittedFiles();
  }, [userUID]);

  const setSnackbar = (message, type) =>
    snackbarCtx.setSnackbar({
      open: true,
      message,
      type,
    });

  const deleteSubmission = async (submission) => {
    const { challengeIndex, imageURL, adobeURL, pdfURL, docID } = submission;
    const pdfIsSubmitted = !!pdfURL;
    const imageStorageRef = ref(storage, imageURL);
    const adobeStorageRef = ref(storage, adobeURL);
    const pdfStorageRef = pdfIsSubmitted ? ref(storage, pdfURL) : "";
    const submissionDoc = doc(
      db,
      `submissions/challenges/challenge${challengeIndex}`,
      docID
    );

    await deleteObject(imageStorageRef).then(
      deleteObject(adobeStorageRef).then(() => {
        if (pdfIsSubmitted) {
          deleteObject(pdfStorageRef);
        }
      })
    );
    await deleteDoc(submissionDoc).then(
      setSnackbar(SNACKBAR_MESSAGE_SUCCESS_DELETE, "success")
    );
    navigate("/refresh", { replace: true });
  };

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      {challengeSubmission.map((file) => {
        return file !== undefined ? (
          <Grid key={file.id} item>
            <Card
              raised
              sx={{ display: "flex", m: "1rem" }}
              style={{ boxShadow: "0px 0px 10px #ffffff" }}
            >
              <CardMedia
                component="img"
                image={file.imageURL}
                sx={styles.media}
              />
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "100%" }}
              >
                <CardHeader
                  title={`Challenge ${file.challenge}: ${
                    challengeStatements[file.challenge - 1]
                  }`}
                  titleTypographyProps={{ fontFamily: "Raider Crusader" }}
                  subheader={file.dateTime}
                  action={
                    <IconButton
                      onClick={() =>
                        deleteSubmission({
                          challengeIndex: file.challenge,
                          imageURL: file.imageURL,
                          adobeURL: file.adobeURL,
                          pdfURL: file.pdfURL,
                          docID: file.id,
                        })
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                />
                <CardActions>
                  <Button href={file.adobeURL}>
                    Download back my Adobe file
                  </Button>
                </CardActions>
                {file.pdfURL && (
                  <CardActions>
                    <Button href={file.pdfURL} target="__blank">
                      View my PDF file
                    </Button>
                  </CardActions>
                )}
              </Box>
            </Card>
          </Grid>
        ) : (
          <Typography>You have not submit any file yet...</Typography>
        );
      })}
    </Grid>
  );
}

export default React.memo(SubmittedFileList);
