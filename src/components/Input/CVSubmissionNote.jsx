import { useState, useEffect, useContext } from "react";

import {
  collection,
  addDoc,
  doc,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { NavLink } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { db, storage } from "../../firebase/firebase-config";
import { getTimestamp, getDateTime } from "../../helpers/date-time-getter";
import AuthContext from "../../store/auth-context";
import SnackbarContext from "../../store/snackbar-context";

/* ------------------------------ Constants ------------------------------ */
const SNACKBAR_MESSAGE_SUCCESS_SUBMIT = "CV is submitted successfully!";
const SNACKBAR_MESSAGE_WARNING_MISSING =
  "Please make sure that you have chosen your CV.";
const SNACKBAR_MESSAGE_WARNING_DISAGREE =
  "You must tick the checkbox to indicate that you give your consent.";
const SNACKBAR_MESSAGE_WARNING_INVALID =
  "Please make sure the file chosen has the correct format(pdf)!";
const Input = styled("input")({
  display: "none",
});

/* ------------------------------ Helper functions ------------------------------ */
const getFileTypes = (uploadedFile) => uploadedFile.name.split(".").pop();

const validateUploadedFiles = (uploadedFileTypes) =>
  uploadedFileTypes === "pdf";

function CVSubmissionNote() {
  /* ------------------------------ Context ------------------------------ */
  const authCtx = useContext(AuthContext);
  const userUID = authCtx.user.uid;
  const userEmail = authCtx.user.email;
  const snackbarCtx = useContext(SnackbarContext);

  /* ------------------------------ Hook ------------------------------ */
  const [cvURL, setCVURL] = useState("");
  const [cvDocID, setCVDocID] = useState("");
  const [agree, setAgree] = useState(false);

  /* ------------------------------ Method ------------------------------ */
  console.log(agree);
  const toggleAgreeHandler = (event) => setAgree(event.target.checked);

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
        setAgree(true);
      }
    };

    getSubmittedCV();
  }, [userUID]);

  const submitFileHandler = async (event) => {
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

    if (!agree) {
      setSnackbar(SNACKBAR_MESSAGE_WARNING_DISAGREE, "warning");
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

    try {
      const docRef = await doc(cvCollectionRef, cvDocID);
      getDownloadURL(cvStorageRef).then(async (url) => {
        if (url !== cvURL && cvURL !== "") {
          await updateDoc(docRef, {
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
    } catch (error) {
      setSnackbar(error.message, "error");
    }

    setSnackbar(SNACKBAR_MESSAGE_SUCCESS_SUBMIT, "success");
  };

  return (
    <Card
      raised
      sx={{ my: "2rem" }}
      style={{ boxShadow: "0px 0px 10px #ffffff" }}
    >
      <CardHeader title="Personal Details Consent" />
      <CardContent sx={{ textAlign: "start" }}>
        <Typography>
          I, as a participant of the CREATION 2022, consent to National
          University of Singapore (NUS) through NUSSU commIT collecting, using
          and/or disclosing my personal data to the startups supported by NUS
          Enterprise for internship opportunities.
        </Typography>
        <br />
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
          * More information about the collection of CVs can be found under{" "}
          <NavLink to="/rules" style={{ color: "#F72585" }}>
            Rules and Regulations
          </NavLink>
        </Typography>
      </CardContent>
      <CardContent>
        <FormControlLabel
          control={<Checkbox checked={agree} onChange={toggleAgreeHandler} />}
          label="I give my consent and agree to the rules and regulations."
        />
      </CardContent>
      {cvURL && (
        <Button href={cvURL} target="__blank">
          View my submitted CV
        </Button>
      )}
      <CardContent>
        <label htmlFor="cv-upload-button">
          <Input
            accept=".pdf"
            id="cv-upload-button"
            multiple
            type="file"
            onChange={submitFileHandler}
          />
          <Button variant="contained" component="span" disabled={!agree}>
            Upload My CV
          </Button>
        </label>
      </CardContent>
    </Card>
  );
}

export default CVSubmissionNote;
