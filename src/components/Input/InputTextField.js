import { useMemo } from "react";

import TextField from "@mui/material/TextField";
import { useFormControl } from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";

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

function InputTextField({ error, helperText, inputRef, icon, placeholder, type }) {
  return (
    <TextField
      error={error}
      fullWidth
      helperText={<TextFieldHelperText focusText={helperText} />}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {icon}
          </InputAdornment>
        ),
      }}
      inputRef={inputRef}
      placeholder={placeholder}
      margin="normal"
      required
      type={type}
      variant="standard"
    />
  );
}

export default InputTextField;
