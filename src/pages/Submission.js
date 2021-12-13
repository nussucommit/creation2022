import { useState } from "react";

import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import { storage } from "../firebase/firebase";

export default function Submission() {
  const [progress, setProgress] = useState(0);
  const [imageURL, setImageURL] = useState('');

  const submitFileHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
  };

  const uploadFiles = (file) => {
    if (!file) return;
    const sotrageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageURL(downloadURL);
        });
      }
    );
  };

  return (
    <div className="App">
      <form onSubmit={submitFileHandler}>
        <input type="file" className="input" />
        <button type="submit">Upload</button>
      </form>
      <hr />
      <h2>Uploading done {progress}%</h2>
      {imageURL !== "" && (
        <img src={imageURL} alt="Submitted competition file" />
      )}
    </div>
  );
}
