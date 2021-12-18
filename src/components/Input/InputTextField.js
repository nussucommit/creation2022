import TextField from "@mui/material/TextField";

function InputTextField({ error, helperText, inputRef, label, type }) {
  return (
    <TextField
      error={error}
      fullWidth
      helperText={helperText}
      inputRef={inputRef}
      label={label}
      required
      type={type}
      variant="standard"
    />
  );
}

export default InputTextField;
