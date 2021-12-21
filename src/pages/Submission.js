import { useState, useContext } from "react";

import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import AuthContext from "../store/auth-context";
import SnackbarContext from "../store/snackbar-context";
import FormContainer from "../components/Input/FormContainer";
import ChallengeSelect from "../components/Submission/ChallengeSelect";
import SubmittedFileList from "../components/Submission/SubmittedFileList";
import FileUploadForm from "../components/Submission/FileUploadForm";
import { db, storage } from "../firebase/firebase";

/* ------------------------------ Constants ------------------------------ */
const SNACKBAR_MESSAGE_SUCCESS_SUBMIT =
  "All files are submitted successfully! Thank you for your participation";
const SNACKBAR_MESSAGE_WARNING_MISSING =
  "Please make sure that you have uploaded all files required";
const SNACKBAR_MESSAGE_WARNING_INVALID =
  "Please make sure the file uploaded has the correct format(jpg/png, psd, pdf)!";

/* ------------------------------ Helper functions ------------------------------ */
const getFileTypes = (uploadedFiles) =>
  uploadedFiles.map((file) => file.name.split(".").pop());

const validateUploadedFiles = (uploadedFileTypes) => {
  const imageFileIsValid =
    uploadedFileTypes[0] === "jpg" || uploadedFileTypes[0] === "png";
  const psdFileIsValid = uploadedFileTypes[1] === "psd";
  const pdfFileIsValid = uploadedFileTypes[2] === "pdf";

  return imageFileIsValid && psdFileIsValid && pdfFileIsValid;
};

function Submission() {
  /* ------------------------------ Context ------------------------------ */
  const authCtx = useContext(AuthContext);
  const snackbarCtx = useContext(SnackbarContext);

  /* ------------------------------ State ------------------------------ */
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [challengeSelected, setChallengeSelected] = useState();
  const [challengeSubmitStatus, setChallengeSubmitStatus] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [psdFile, setPSDFile] = useState(null);
  const [pdfFile, setPDFFile] = useState(null);

  /* ------------------------------ Method ------------------------------ */
  const changeSubmittedChallengeHandler = (submissionStatus) => {
    setChallengeSubmitStatus(submissionStatus);
  };

  const selectChallengeHandler = (challenge) => {
    setChallengeSelected(challenge);
  };

  const uploadImageHandler = (image) => {
    setImageFile(image);
  };
  const uploadPSDHandler = (psd) => {
    setPSDFile(psd);
  };
  const uploadPDFHandler = (pdf) => {
    setPDFFile(pdf);
  };

  const setSnackbar = (message, type) =>
    snackbarCtx.setSnackbar({
      open: true,
      message,
      type,
    });

  const submitFileHandler = async (event) => {
    event.preventDefault();

    if (!imageFile || !psdFile || !pdfFile) {
      setSnackbar(SNACKBAR_MESSAGE_WARNING_MISSING, "warning");
      return;
    }

    /* ------------------------------ Type validation ------------------------------ */
    const fileTypes = getFileTypes([imageFile, psdFile, pdfFile]);
    const allFilesAreValid = validateUploadedFiles(fileTypes);
    if (!allFilesAreValid) {
      setSnackbar(SNACKBAR_MESSAGE_WARNING_INVALID, "warning");
      return;
    }

    setIsSubmitting(true);

    /* ------------------------------ File name modification ------------------------------ */
    const userEmailPrefix = authCtx.user.email.replace("@u.nus.edu", "");
    const modifiedImageName = `${userEmailPrefix}.${fileTypes[0]}`;
    const modifiedPSDName = `${userEmailPrefix}.${fileTypes[1]}`;
    const modifiedPDFName = `${userEmailPrefix}.${fileTypes[2]}`;

    const imageStorageLocation = `submissions/${userEmailPrefix}/challenge${challengeSelected}_${modifiedImageName}`;
    const psdStorageLocation = `submissions/${userEmailPrefix}/challenge${challengeSelected}_${modifiedPSDName}`;
    const pdfStorageLocation = `submissions/${userEmailPrefix}/challenge${challengeSelected}_${modifiedPDFName}`;

    const imageStorageRef = ref(storage, imageStorageLocation);
    const psdStorageRef = ref(storage, psdStorageLocation);
    const pdfStorageRef = ref(storage, pdfStorageLocation);

    /* ------------------------------ File submission ------------------------------ */
    await uploadBytes(imageStorageRef, imageFile);
    await uploadBytes(psdStorageRef, psdFile);
    await uploadBytes(pdfStorageRef, pdfFile);

    /* ------------------------------ Record submission link ------------------------------ */
    const submissionCollectionRef = collection(
      db,
      `submissions/challenges/challenge${challengeSelected}`
    );
    const userUID = authCtx.user.uid;
    getDownloadURL(imageStorageRef).then(async (imageURL) => {
      getDownloadURL(psdStorageRef).then(async (psdURL) => {
        getDownloadURL(pdfStorageRef).then(async (pdfURL) => {
          await addDoc(submissionCollectionRef, {
            uid: userUID,
            challenge: challengeSelected,
            imageURL,
            psdURL,
            pdfURL,
          });
        });
      });
    });

    setIsSubmitting(false);
    setSnackbar(SNACKBAR_MESSAGE_SUCCESS_SUBMIT, "success");
  };

  return (
    <FormContainer>
      <Card raised>
        <CardHeader title="My submission" />
        <SubmittedFileList checkSubmit={changeSubmittedChallengeHandler} />
        <form onSubmit={submitFileHandler}>
          <CardContent>
            <ChallengeSelect
              onSelect={selectChallengeHandler}
              submittedChallenge={challengeSubmitStatus}
            />
            <FileUploadForm fileType="image/*" onUpload={uploadImageHandler} />
            <FileUploadForm fileType=".psd" onUpload={uploadPSDHandler} />
            <FileUploadForm fileType=".pdf" onUpload={uploadPDFHandler} />
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              type="submit"
              disabled={isSubmitting}
              fullWidth
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </CardActions>
        </form>
      </Card>
    </FormContainer>
  );
}

export default Submission;
