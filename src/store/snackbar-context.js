import { createContext, useState } from "react";

const SnackbarContext = createContext({
  snackbar: {},
  setSnackbar: () => {},
});

export const SnackbarContextProvider = (props) => {
  const [snackbar, setSnackbar] = useState({});

  const setSnackbarHander = (newSnackbar) =>
    setSnackbar({ ...snackbar, ...newSnackbar });

  const contextValue = {
    snackbar,
    setSnackbar: setSnackbarHander
  };

  return (
    <SnackbarContext.Provider value={contextValue}>
      {props.children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarContext;
