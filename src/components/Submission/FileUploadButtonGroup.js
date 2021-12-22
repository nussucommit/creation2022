import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

function FileUploadButtonGroup({ buttonLabel, fileType, onUpload }) {
  const uploadHandler = (event) => {
    event.preventDefault();
    onUpload(event.target.files[0]);
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="flex-start"
    >
      <Grid item sx={{ my: 1 }}>
        <Typography variant="h6">{buttonLabel}</Typography>
        <Input
          inputProps={{ accept: fileType }}
          type="file"
          onChange={uploadHandler}
          disableUnderline
          required
        />
      </Grid>
    </Grid>
  );
}

export default FileUploadButtonGroup;
