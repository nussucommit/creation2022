import { useContext } from "react";

import AuthContext from "../store/auth-context";
import AddAnnouncement from "../components/Announcement/AddAnnouncement";
import AnnouncementList from "../components/Announcement/AnnouncementList";

function Announcement() {
  const authCtx = useContext(AuthContext);
  const isSignedIn = authCtx.isSignedIn;
  const isAdmin =
    isSignedIn && authCtx.user.uid === "4boshrfLGyRfR2nakesjTx0faKx1";

  return (
    <div>
      {isAdmin && <AddAnnouncement />}
      <AnnouncementList isAdmin={isAdmin} />
    </div>
  );
}

export default Announcement;
