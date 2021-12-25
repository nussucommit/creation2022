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
      <Grid
        container
        direction="row"
        textAlign="start"
        sx={{
          my: 1,
        }}
      >
        <Grid item xs={3}>
          <Typography variant="h6">{buttonLabel}</Typography>
        </Grid>
        <Grid item xs />
        <Grid item xs={8}>
          <Input
            inputProps={{ accept: fileType }}
            type="file"
            onChange={uploadHandler}
            disableUnderline
            required={fileType !== ".pdf"}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default FileUploadButtonGroup;
