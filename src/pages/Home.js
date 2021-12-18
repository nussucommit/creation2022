import { useContext } from "react";

import AuthContext from "../store/auth-context";

export default function Home() {
  const authCtx = useContext(AuthContext);
  const currentUser = authCtx.user;

  return (
    <div>{currentUser ? `Welcome, ${currentUser.email}` : "Home page"}</div>
  );
}
