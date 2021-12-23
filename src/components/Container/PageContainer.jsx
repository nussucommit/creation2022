import Grid from "@mui/material/Grid";

function PageContainer({ childComponents }) {
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs />
      <Grid item xs={10}>
        {childComponents.map((component, index) => {
          const isFirtstItem = index === 0;
          return (
            <Grid
              key={index}
              item
              textAlign={isFirtstItem && "center"}
              sx={{ m: '2rem' }}
            >
              {component}
            </Grid>
          );
        })}
      </Grid>
      <Grid item xs />
    </Grid>
  );
}

export default PageContainer;
