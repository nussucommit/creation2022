import { useMemo } from "react";

import TextField from "@mui/material/TextField";
import { useFormControl } from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

function TextFieldHelperText({ focusText }) {
  const { focused } = useFormControl() || {};

  const helperText = useMemo(() => {
    if (focused) {
      return focusText;
    }

    return "";
  }, [focused, focusText]);

  return <FormHelperText>{helperText}</FormHelperText>;
}

function InputTextField({ error, helperText, inputRef, label, type }) {
  return (
    <TextField
      error={error}
      fullWidth
      helperText={<TextFieldHelperText focusText={helperText} />}
      inputRef={inputRef}
      label={label}
      margin="normal"
      required
      type={type}
      variant="standard"
    />
  );
}

export default InputTextField;
