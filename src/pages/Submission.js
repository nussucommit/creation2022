import { useState } from "react";

import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Backdrop from "@mui/material/Backdrop";

import PageContainer from "../components/Container/PageContainer";
import SubmittedFileList from "../components/Submission/SubmittedFileList";
import FileUploadForm from "../components/Submission/FileUploadForm";

function Submission() {
  const [openUploadForm, setOpenUploadForm] = useState(false);
  const [challengeSubmitStatus, setChallengeSubmitStatus] = useState([]);

  const closeUploadFormHandler = () => {
    setOpenUploadForm(false);
  };

  const toggleOpenUploadFormHandler = () => {
    setOpenUploadForm(!openUploadForm);
  };

  const PageTitle = () => <Typography variant="h4">Submission</Typography>;

  const AddSubmissionButton = () => (
    <Fab
      color="primary"
      onClick={toggleOpenUploadFormHandler}
      sx={{ position: "fixed", bottom: 30, right: 30 }}
    >
      <AddIcon />
    </Fab>
  );

  return (
    <PageContainer
      childComponents={[
        <PageTitle />,
        <AddSubmissionButton />,
        <SubmittedFileList
          render={true}
          checkSubmit={setChallengeSubmitStatus}
        />,
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openUploadForm}
        >
          <FileUploadForm
            challengeSubmitStatus={challengeSubmitStatus}
            onCancel={closeUploadFormHandler}
          />
        </Backdrop>,
      ]}
    />
  );
}

export default Submission;
