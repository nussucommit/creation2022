import { useState } from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function ChallengeSelect({ submittedChallenge, onSelect }) {
  const [challenge, setChallenge] = useState("");

  const handleChange = (event) => {
    onSelect(event.target.value);
    setChallenge(event.target.value);
  };

  return (
    <FormControl required fullWidth>
      <InputLabel>Challenge</InputLabel>
      <Select value={challenge} onChange={handleChange} label="Challenge *">
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {submittedChallenge.map((isNotSubmitted, index) => {
          const challengeIndex = index + 1;
          return isNotSubmitted ? (
            <MenuItem value={challengeIndex}>{challengeIndex}</MenuItem>
          ) : null;
        })}
      </Select>
    </FormControl>
  );
}

export default ChallengeSelect;
