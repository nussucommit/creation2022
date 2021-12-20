import { useContext, useState, useEffect } from "react";

import { collection, getDocs, query, where } from "firebase/firestore";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";

import AuthContext from "../../store/auth-context";
import { db } from "../../firebase/firebase";

const styles = {
  media: {
    width: "100%",
    height: "100%",
  },
};

function SubmittedFileList() {
  const authCtx = useContext(AuthContext);
  const userUID = authCtx.user.uid;
  const [challengeSubmission, setChallengeSubmission] = useState([]);

  useEffect(() => {
    const challengeIndexes = [1, 2, 3, 4];
    const challengePaths = challengeIndexes.map(
      (index) => `submissions/challenges/challenge${index}`
    );
    const challengeRefs = challengePaths.map((path) =>
      query(collection(db, path), where("uid", "==", userUID))
    );
    const getSubmittedFiles = () => {
      challengeRefs.map(async (ref) => {
        const challengeData = await getDocs(ref);
        setChallengeSubmission((prev) => [
          ...prev,
          challengeData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0],
        ]);
      });
    };

    getSubmittedFiles();
  }, [userUID]);

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      {challengeSubmission.map((file) => {
        return file !== undefined ? (
          <Grid key={file.id} item>
            <Card raised>
              <CardHeader title={`Challenge ${file.challenge} Submission`} />
              <CardMedia
                component="img"
                image={file.imageURL}
                sx={styles.media}
              />
            </Card>
          </Grid>
        ) : null;
      })}
    </Grid>
  );
}

export default SubmittedFileList;
