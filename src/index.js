import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./store/auth-context";
import { SnackbarContextProvider } from "./store/snackbar-context";

ReactDOM.render(
  <SnackbarContextProvider>
    <AuthContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </SnackbarContextProvider>,
  document.getElementById("root")
);
