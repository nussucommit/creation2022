import { useMemo } from "react";

import Input from "@mui/material/Input";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";

function FocusHelperText({ focusText }) {
  const { focused } = useFormControl() || {};

  const helperText = useMemo(() => {
    if (focused) {
      return focusText;
    }

    return "";
  }, [focused, focusText]);

  return <FormHelperText>{helperText}</FormHelperText>;
}

function InputTextField({
  error,
  helperText,
  inputRef,
  icon,
  placeholder,
  type,
}) {
  return (
    <FormControl fullWidth margin="normal" required variant="standard">
      <Input
        autoComplete=""
        error={error}
        placeholder={placeholder}
        startAdornment={
          <InputAdornment position="start">{icon}</InputAdornment>
        }
        inputRef={inputRef}
        type={type}
      />
      <FocusHelperText focusText={helperText} />
    </FormControl>
  );
}

export default InputTextField;
