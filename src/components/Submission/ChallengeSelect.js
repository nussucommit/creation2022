import { useState } from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function ChallengeSelect({onSelect}) {
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
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
      </Select>
    </FormControl>
  );
}

export default ChallengeSelect;
