import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

function FormContainer(props) {
  return (
    <Container maxWidth="sm">
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={11} sm={8}>
          {props.children}
        </Grid>
      </Grid>
    </Container>
  );
}

export default FormContainer;
