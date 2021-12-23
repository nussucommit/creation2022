import { useContext, forwardRef } from "react";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import SnackbarContext from "../../store/snackbar-context";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CustomSnackbar() {
  const snackbarCtx = useContext(SnackbarContext);
  const message = snackbarCtx.snackbar.message;
  const open = snackbarCtx.snackbar.open;
  const type = snackbarCtx.snackbar.type;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    snackbarCtx.setSnackbar({ open: false });
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default CustomSnackbar;
