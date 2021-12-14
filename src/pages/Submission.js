import FileUploadForm from "../components/Submission/FileUploadForm";

function Submission() {
  return (
    <>
      <FileUploadForm fileType="image" />
      <FileUploadForm fileType="psd" />
    </>
  );
}

export default Submission;
