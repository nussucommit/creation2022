import { useState, useContext } from "react";

import { ref, uploadBytes } from "firebase/storage";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import AuthContext from "../store/auth-context";
import SnackbarContext from "../store/snackbar-context";
import FileUploadForm from "../components/Submission/FileUploadForm";
import { storage } from "../firebase/firebase";

const SNACKBAR_MESSAGE_WARNING_MISSING =
  "Please make sure that you have uploaded all files required";
const SNACKBAR_MESSAGE_WARNING_INVALID =
  "Please make sure the file uploaded has the correct format(jpg/png, psd, pdf)!";

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
  const [imageFile, setImageFile] = useState(null);
  const [psdFile, setPSDFile] = useState(null);
  const [pdfFile, setPDFFile] = useState(null);

  /* ------------------------------ Method ------------------------------ */
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

  const submitFileHandler = (event) => {
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

    /* ------------------------------ File name modification ------------------------------ */
    const userEmailPrefix = authCtx.user.email.replace("@u.nus.edu", "");
    const modifiedImageName = `${userEmailPrefix}.${fileTypes[0]}`;
    const modifiedPSDName = `${userEmailPrefix}.${fileTypes[1]}`;
    const modifiedPDFName = `${userEmailPrefix}.${fileTypes[2]}`;

    const imageStorageLocation = `submissions/${userEmailPrefix}/${modifiedImageName}`;
    const psdStorageLocation = `submissions/${userEmailPrefix}/${modifiedPSDName}`;
    const pdfStorageLocation = `submissions/${userEmailPrefix}/${modifiedPDFName}`;

    const imageStorageRef = ref(storage, imageStorageLocation);
    const psdStorageRef = ref(storage, psdStorageLocation);
    const pdfStorageRef = ref(storage, pdfStorageLocation);

    uploadBytes(imageStorageRef, imageFile);
    uploadBytes(psdStorageRef, psdFile);
    uploadBytes(pdfStorageRef, pdfFile);
  };

  return (
    <Card raised>
      <CardHeader title="My submission" />
      <form onSubmit={submitFileHandler}>
        <CardContent>
          <FileUploadForm fileType="image/*" onUpload={uploadImageHandler} />
          <FileUploadForm fileType=".psd" onUpload={uploadPSDHandler} />
          <FileUploadForm fileType=".pdf" onUpload={uploadPDFHandler} />
        </CardContent>
        <CardActions>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </CardActions>
      </form>
    </Card>
  );
}

export default Submission;
