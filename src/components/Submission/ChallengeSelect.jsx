import { useContext, useEffect, useState } from "react";

import { collection, getDocs, query, where } from "firebase/firestore";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { db } from "../../firebase/firebase-config";
import AuthContext from "../../store/auth-context";

const challengeStatements = [
  "Key Visual for NUS Commencement Class Giving 2023",
  "Digital Poster for Phishing via Email, Calls and SMS",
  "Digital Poster for Business Email Compromise",
  "Digital Poster to Raise Awareness of Ransomware",
];

function ChallengeSelect({ onSelect }) {
  const authCtx = useContext(AuthContext);

  const [challengeSelected, setChallengeSelected] = useState("");
  const [challengeSubmitStatus, setChallengeSubmitStatus] = useState([]);

  const userUID = authCtx.user.uid;

  useEffect(() => {
    const challengeIndexes = [1, 2, 3, 4];
    const challengePaths = challengeIndexes.map(
      (index) => `submissions/challenges/challenge${index}`
    );
    const challengeRefs = challengePaths.map((path) =>
      query(collection(db, path), where("uid", "==", userUID))
    );

    const getSubmitStatus = () => {
      challengeRefs.map(async (ref, index) => {
        const challengeData = await getDocs(ref);
        const docIsEmpty = challengeData.docs.length === 0;
        if (docIsEmpty) {
          setChallengeSubmitStatus((prevStatus) => [...prevStatus, index + 1]);
        }
      });
    };

    getSubmitStatus();
  }, [userUID]);

  const handleChange = (event) => {
    onSelect(event.target.value);
    setChallengeSelected(event.target.value);
  };

  return (
    <FormControl required fullWidth>
      <InputLabel>Challenge statement</InputLabel>
      <Select
        value={challengeSelected}
        onChange={handleChange}
        label="Challenge statement*"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {challengeSubmitStatus.map((unSubmittedIndex, index) => (
          <MenuItem key={unSubmittedIndex} value={unSubmittedIndex}>
            {`${unSubmittedIndex}: ${challengeStatements[index]}`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default ChallengeSelect;
