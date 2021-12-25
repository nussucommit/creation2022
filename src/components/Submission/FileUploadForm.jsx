import React, { useState, useCallback, useContext } from "react";

import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import { db, storage } from "../../firebase/firebase-config";
import { getTimestamp, getDateTime } from "../../helpers/date-time-getter";
import AuthContext from "../../store/auth-context";
import SnackbarContext from "../../store/snackbar-context";
import FormContainer from "../Container/FormContainer";
import ChallengeSelect from "./ChallengeSelect";
import FileUploadButtonGroup from "./FileUploadButtonGroup";

/* ------------------------------ Constants ------------------------------ */
const SNACKBAR_MESSAGE_SUCCESS_SUBMIT = "All files are submitted successfully!";
const SNACKBAR_MESSAGE_WARNING_MISSING =
  "Please make sure that you have uploaded all files required";
const SNACKBAR_MESSAGE_WARNING_INVALID =
  "Please make sure the file chosen has the correct format(jpg/png, psd, pdf)!";

/* ------------------------------ Helper functions ------------------------------ */
const getFileTypes = (uploadedFiles) =>
  uploadedFiles.map((file) => file.name.split(".").pop());

const validateUploadedFiles = (uploadedFileTypes) => {
  const imageFileIsValid =
    uploadedFileTypes[0] === "jpg" || uploadedFileTypes[0] === "png";
  const psdFileIsValid = uploadedFileTypes[1] === "psd";
  const pdfIsNotChosen = uploadedFileTypes.length === 2;
  const pdfFileIsValid = pdfIsNotChosen || uploadedFileTypes[2] === "pdf";

  return imageFileIsValid && psdFileIsValid && pdfFileIsValid;
};

function FileUploadForm({ onCancel }) {
  /* ------------------------------ Context ------------------------------ */
  const authCtx = useContext(AuthContext);
  const snackbarCtx = useContext(SnackbarContext);

  /* ------------------------------ Hook ------------------------------ */
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [challengeSelected, setChallengeSelected] = useState();
  const [imageFile, setImageFile] = useState(null);
  const [psdFile, setPSDFile] = useState(null);
  const [pdfFile, setPDFFile] = useState(null);

  /* ------------------------------ Method ------------------------------ */
  const submitFileHandler = useCallback(
    async (event) => {
      event.preventDefault();

      const setSnackbar = (message, type) =>
        snackbarCtx.setSnackbar({
          open: true,
          message,
          type,
        });

      if (!imageFile || !psdFile) {
        setSnackbar(SNACKBAR_MESSAGE_WARNING_MISSING, "warning");
        return;
      }

      /* ------------------------------ Type validation ------------------------------ */
      const pdfIsChosen = !!pdfFile;
      const filesToCheck = pdfIsChosen
        ? [imageFile, psdFile, pdfFile]
        : [imageFile, psdFile];
      const fileTypes = getFileTypes(filesToCheck);
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
      const modifiedPDFName = pdfIsChosen
        ? `${userEmailPrefix}.${fileTypes[2]}`
        : "";

      const imageStorageLocation = `submissions/${userEmailPrefix}/challenge${challengeSelected}_${modifiedImageName}`;
      const psdStorageLocation = `submissions/${userEmailPrefix}/challenge${challengeSelected}_${modifiedPSDName}`;
      const pdfStorageLocation = pdfIsChosen
        ? `submissions/${userEmailPrefix}/challenge${challengeSelected}_${modifiedPDFName}`
        : "";

      const imageStorageRef = ref(storage, imageStorageLocation);
      const psdStorageRef = ref(storage, psdStorageLocation);
      const pdfStorageRef = ref(storage, pdfStorageLocation);

      /* ------------------------------ File submission ------------------------------ */
      await uploadBytes(imageStorageRef, imageFile);
      await uploadBytes(psdStorageRef, psdFile);
      if (pdfIsChosen) {
        await uploadBytes(pdfStorageRef, pdfFile);
      }

      /* ------------------------------ Record submission link ------------------------------ */
      const submissionCollectionRef = collection(
        db,
        `submissions/challenges/challenge${challengeSelected}`
      );
      const userUID = authCtx.user.uid;
      const currentTimestamp = getTimestamp();

      getDownloadURL(imageStorageRef).then(async (imageURL) => {
        getDownloadURL(psdStorageRef).then(async (psdURL) => {
          if (pdfIsChosen) {
            getDownloadURL(pdfStorageRef).then(async (pdfURL) => {
              await addDoc(submissionCollectionRef, {
                uid: userUID,
                timestamp: currentTimestamp,
                dateTime: getDateTime(currentTimestamp),
                challenge: challengeSelected,
                imageURL,
                psdURL,
                pdfURL,
              }).then(navigate("/refresh", { replace: true }));
            });
          } else {
            await addDoc(submissionCollectionRef, {
              uid: userUID,
              timestamp: currentTimestamp,
              dateTime: getDateTime(currentTimestamp),
              challenge: challengeSelected,
              imageURL,
              psdURL,
            }).then(navigate("/refresh", { replace: true }));
          }
        });
      });

      setIsSubmitting(false);
      setSnackbar(SNACKBAR_MESSAGE_SUCCESS_SUBMIT, "success");
      onCancel();
    },
    [
      imageFile,
      psdFile,
      pdfFile,
      authCtx.user.email,
      authCtx.user.uid,
      snackbarCtx,
      challengeSelected,
      onCancel,
      navigate,
    ]
  );

  const uploadButtonProps = [
    {
      label: "Image (.png/.jpg): ",
      type: "image/*",
      uploadMethod: setImageFile,
    },
    {
      label: "Photoshop (.psd): ",
      type: ".psd",
      uploadMethod: setPSDFile,
    },
    {
      label: "PDF (.pdf): ",
      type: ".pdf",
      uploadMethod: setPDFFile,
    },
  ];

  return (
    <FormContainer
      childComponents={[
        <Card raised>
          <CardHeader title="Submit your files here" />
          <form onSubmit={submitFileHandler}>
            <CardContent>
              <ChallengeSelect onSelect={setChallengeSelected} />
              {uploadButtonProps.map((prop) => (
                <FileUploadButtonGroup
                  key={prop.type}
                  buttonLabel={prop.label}
                  fileType={prop.type}
                  onUpload={prop.uploadMethod}
                />
              ))}
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
            <CardActions>
              <Button
                variant="outlined"
                disabled={isSubmitting}
                onClick={onCancel}
                fullWidth
              >
                Cancel
              </Button>
            </CardActions>
          </form>
        </Card>,
      ]}
    />
  );
}

export default React.memo(FileUploadForm);
