import { useContext, useEffect, useState } from "react";

import { collection, getDocs, query, where } from "firebase/firestore";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { db } from "../../firebase/firebase-config";
import AuthContext from "../../store/auth-context";

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
        {challengeSubmitStatus.map((unSubmittedIndex) => (
          <MenuItem key={unSubmittedIndex} value={unSubmittedIndex}>
            {unSubmittedIndex}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default ChallengeSelect;
