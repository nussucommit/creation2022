import React, { useState } from "react";

import styled from "styled-components";
import { ref, uploadBytesResumable } from "firebase/storage";
import Button from "@mui/material/Button";

import { storage } from "../../firebase/firebase";

function FileUploadForm({ fileType }) {
  const [fileName, setFileName] = useState("No file uploaded yet.");

  const submitFileHandler = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    uploadFile(file);
  };

  const uploadFile = (file) => {
    if (!file) {
      return;
    }
    const storageRef = ref(storage, `${fileType}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => alert(error.message),
      (complete) => setFileName(file.name)
    );
  };

  return (
    <div className="App">
      <form>
        <label htmlFor={`contained-button-${fileType}file`}>
          <InvisibleInput
            accept={fileType === "image" ? `image/*` : `.${fileType}`}
            id={`contained-button-${fileType}file`}
            type="file"
            onChange={submitFileHandler}
          />
          <Button variant="outlined" component="span">
            Upload your {fileType} file here
          </Button>
          {fileName}
        </label>
      </form>
    </div>
  );
}

export default FileUploadForm;

const InvisibleInput = styled.input`
  display: none;
`;
