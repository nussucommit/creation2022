import { useState } from "react";

import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import { storage } from "../firebase/firebase";

export default function Submission() {
  const [progress, setProgress] = useState(0);
  const [imageURL, setImageURL] = useState("");

  const submitFileHandler = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    uploadFiles(file);
  };

  const uploadFiles = (file) => {
    if (!file) {
      return;
    }
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => alert(error.message),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageURL(downloadURL);
        });
      }
    );
  };

  return (
    <div className="App">
      <form>
        <input type="file" onChange={submitFileHandler} />
      </form>
      <hr />
      <h2>Uploading done {progress}%</h2>
      {imageURL !== "" && (
        <img src={imageURL} alt="Submitted competition file" />
      )}
    </div>
  );
}
