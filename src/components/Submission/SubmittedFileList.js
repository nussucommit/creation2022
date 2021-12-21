import { useContext, useState, useEffect } from "react";

import {
  collection,
  doc,
  getDocs,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { deleteObject, ref } from "firebase/storage";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import AuthContext from "../../store/auth-context";
import SnackbarContext from "../../store/snackbar-context";
import { db, storage } from "../../firebase/firebase";

const styles = {
  media: {
    width: "100%",
    height: "100%",
  },
};

function SubmittedFileList({ render, checkSubmit }) {
  const authCtx = useContext(AuthContext);
  const snackbarCtx = useContext(SnackbarContext);

  const navigate = useNavigate();
  const [challengeSubmitted, setChallengeSubmitted] = useState([]);
  const [challengeSubmission, setChallengeSubmission] = useState([]);

  const userUID = authCtx.user.uid;
  const SNACKBAR_MESSAGE_SUCCESS_DELETE =
    "File successfully deleted!";

  useEffect(() => {
    const challengeIndexes = [1, 2, 3, 4];
    const challengePaths = challengeIndexes.map(
      (index) => `submissions/challenges/challenge${index}`
    );
    const challengeRefs = challengePaths.map((path) =>
      query(collection(db, path), where("uid", "==", userUID))
    );
    const getSubmittedFiles = () => {
      challengeRefs.map(async (ref) => {
        const challengeData = await getDocs(ref);
        const docIsEmpty = challengeData.docs.length === 0;
        setChallengeSubmitted((prev) => [...prev, docIsEmpty]);
        if (!docIsEmpty) {
          setChallengeSubmission((prev) => [
            ...prev,
            challengeData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0],
          ]);
        }
      });
    };

    getSubmittedFiles();
  }, [render, userUID]);

  useEffect(
    () => checkSubmit(challengeSubmitted),
    [render, checkSubmit, challengeSubmitted]
  );

  const setSnackbar = (message, type) =>
    snackbarCtx.setSnackbar({
      open: true,
      message,
      type,
    });

  const deleteSubmission = async (
    challengeIndex,
    imageURL,
    psdURL,
    pdfURL,
    docID
  ) => {
    const imageStorageRef = await ref(storage, imageURL);
    const psdStorageRef = await ref(storage, psdURL);
    const pdfStorageRef = await ref(storage, pdfURL);
    const submissionDoc = doc(
      db,
      `submissions/challenges/challenge${challengeIndex}`,
      docID
    );

    await deleteObject(imageStorageRef).then(
      deleteObject(psdStorageRef).then(deleteObject(pdfStorageRef))
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
          <Grid key={`${file.id}_${render}`} item>
            <Card raised>
              <CardHeader
                title={`Challenge ${file.challenge} Submission`}
                action={
                  <IconButton
                    onClick={() =>
                      deleteSubmission(
                        file.challenge,
                        file.imageURL,
                        file.psdURL,
                        file.pdfURL,
                        file.id
                      )
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              />
              <CardMedia
                component="img"
                image={file.imageURL}
                sx={styles.media}
              />
            </Card>
          </Grid>
        ) : null;
      })}
    </Grid>
  );
}

export default SubmittedFileList;
