import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./store/auth-context";
import "./fonts/raidercrusader.ttf";
import "./fonts/NovaFlat-Regular.ttf";
import "./fonts/Poppins/Poppins-Black.ttf";
import "./fonts/Poppins/Poppins-Bold.ttf";
import "./fonts/Poppins/Poppins-ExtraBold.ttf";
import "./fonts/Poppins/Poppins-SemiBold.ttf";
import "./fonts/Poppins/Poppins-Medium.ttf";
import "./fonts/Poppins/Poppins-Regular.ttf";
import "./fonts/Poppins/Poppins-Light.ttf";
import "./fonts/Poppins/Poppins-Thin.ttf";
import "./fonts/Poppins/Poppins-ExtraLight.ttf";
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
