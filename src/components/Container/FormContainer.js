import Grid from "@mui/material/Grid";

function FormContainer({ childComponents }) {
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs />
      <Grid item xs={10} sm={8} md={6}>
        {childComponents.map((component, index) => {
          return (
            <Grid key={index} item textAlign="center" sx={{ m: "1rem" }}>
              {component}
            </Grid>
          );
        })}
      </Grid>
      <Grid item xs />
    </Grid>
  );
}

export default FormContainer;
