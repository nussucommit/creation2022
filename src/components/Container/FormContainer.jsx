import React from "react";

import Grid from "@mui/material/Grid";

function FormContainer({ childComponents }) {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems={childComponents.length === 1 ? "center" : "flex-start"}
      className="mainBody"
    >
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

export default React.memo(FormContainer);
