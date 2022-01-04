import { useState, useEffect, useContext, useCallback } from "react";

import {
  collection,
  addDoc,
  doc,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";

import { db, storage } from "../../firebase/firebase-config";
import { getTimestamp, getDateTime } from "../../helpers/date-time-getter";
import AuthContext from "../../store/auth-context";
import SnackbarContext from "../../store/snackbar-context";

/* ------------------------------ Constants ------------------------------ */
const SNACKBAR_MESSAGE_SUCCESS_SUBMIT = "CV is submitted successfully!";
const SNACKBAR_MESSAGE_WARNING_MISSING =
  "Please make sure that you have chosen your CV.";
const SNACKBAR_MESSAGE_WARNING_INVALID =
  "Please make sure the file chosen has the correct format(pdf)!";
const Input = styled("input")({
  display: "none",
});

/* ------------------------------ Helper functions ------------------------------ */
const getFileTypes = (uploadedFile) => uploadedFile.name.split(".").pop();

const validateUploadedFiles = (uploadedFileTypes) =>
  uploadedFileTypes === "pdf";

function CVSubmissionNote({ onToggleOpenAgreement }) {
  /* ------------------------------ Context ------------------------------ */
  const authCtx = useContext(AuthContext);
  const userUID = authCtx.user.uid;
  const userEmail = authCtx.user.email;
  const snackbarCtx = useContext(SnackbarContext);

  /* ------------------------------ Hook ------------------------------ */
  const [cvURL, setCVURL] = useState("");
  const [cvDocID, setCVDocID] = useState("");

  /* ------------------------------ Method ------------------------------ */
  useEffect(() => {
    const cvRef = query(collection(db, "CV"), where("uid", "==", userUID));

    const getSubmittedCV = async () => {
      const cvData = await getDocs(cvRef);
      const docIsEmpty = cvData.docs.length === 0;
      if (!docIsEmpty) {
        const cvURL = cvData.docs.map((doc) => doc.data().cvURL)[0];
        const cvDocID = cvData.docs.map((doc) => doc.id)[0];
        setCVURL(cvURL);
        setCVDocID(cvDocID);
      }
    };

    getSubmittedCV();
  }, [userUID]);

  const submitFileHandler = useCallback(
    async (event) => {
      event.preventDefault();
      const cvFile = event.target.files[0];

      const setSnackbar = (message, type) =>
        snackbarCtx.setSnackbar({
          open: true,
          message,
          type,
        });

      if (!cvFile) {
        setSnackbar(SNACKBAR_MESSAGE_WARNING_MISSING, "warning");
        return;
      }

      /* ------------------------------ Type validation ------------------------------ */
      const fileType = getFileTypes(cvFile);
      const fileIsValid = validateUploadedFiles(fileType);
      if (!fileIsValid) {
        setSnackbar(SNACKBAR_MESSAGE_WARNING_INVALID, "warning");
        return;
      }

      /* ------------------------------ File name modification ------------------------------ */
      const userEmailPrefix = userEmail.replace("@u.nus.edu", "");
      const modifiedCVName = `CV_${userEmailPrefix}.${fileType}`;

      const cvStorageLocation = `CV/${modifiedCVName}`;

      const cvStorageRef = ref(storage, cvStorageLocation);

      /* ------------------------------ File submission ------------------------------ */
      await uploadBytes(cvStorageRef, cvFile);

      /* ------------------------------ Record submission link ------------------------------ */
      const cvCollectionRef = collection(db, `CV`);
      const currentTimestamp = getTimestamp();

      getDownloadURL(cvStorageRef).then(async (url) => {
        if (url !== cvURL && cvURL !== "") {
          await updateDoc(doc(cvCollectionRef, cvDocID), {
            uid: userUID,
            timestamp: currentTimestamp,
            dateTime: getDateTime(currentTimestamp),
            cvURL: url,
          });
        } else {
          await addDoc(cvCollectionRef, {
            uid: userUID,
            timestamp: currentTimestamp,
            dateTime: getDateTime(currentTimestamp),
            cvURL: url,
          });
        }
        setCVURL(url);
      });

      setSnackbar(SNACKBAR_MESSAGE_SUCCESS_SUBMIT, "success");
    },
    [userUID, cvDocID, cvURL, userEmail, snackbarCtx]
  );

  return (
    <Card
      raised
      sx={{ my: "2rem" }}
      style={{ boxShadow: "0px 0px 10px #ffffff", textAlign: "start" }}
    >
      <CardContent>
        <Typography>
          * Please notice that it is not compulsory to submit your CV for
          joining the competition
        </Typography>
        <br />
        <Typography>
          * Please indicate your period of availability for potential internship
          opportunities in your CV
        </Typography>
        <br />
        <Typography>
          * More information about the collection of CVs can be found under
          <Button size="small" onClick={onToggleOpenAgreement}>
            Rules and Regulations
          </Button>
        </Typography>
      </CardContent>
      {cvURL && (
        <CardActions>
          <Button href={cvURL} target="__blank" fullWidth>
            View my submitted CV
          </Button>
        </CardActions>
      )}
      <CardActions>
        <label htmlFor="cv-upload-button">
          <Input
            accept=".pdf"
            id="cv-upload-button"
            multiple
            type="file"
            onChange={submitFileHandler}
          />
          <Button variant="contained" component="span">
            Upload My CV
          </Button>
        </label>
      </CardActions>
    </Card>
  );
}

export default CVSubmissionNote;
