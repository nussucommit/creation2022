function FileUploadForm({ fileType, onUpload }) {
  const uploadHandler = (event) => {
    event.preventDefault();
    onUpload(event.target.files[0]);
  };

  return (
    <input accept={fileType} type="file" onChange={uploadHandler} required />
  );
}

export default FileUploadForm;
