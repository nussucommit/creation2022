import { useContext } from "react";

import AuthContext from "../store/auth-context";
import AddAnnouncement from "../components/Announcement/AddAnnouncement";
import AnnouncementList from "../components/Announcement/AnnouncementList";
import PageContainer from "../components/Container/PageContainer";

function Announcement() {
  const authCtx = useContext(AuthContext);

  const isSignedIn = authCtx.isSignedIn;
  const ADMIN_UID = "4boshrfLGyRfR2nakesjTx0faKx1";
  const isAdmin = isSignedIn && authCtx.user.uid === ADMIN_UID;

  return (
    <PageContainer
      childComponents={[
        <h1
          className="mainTitle"
          style={{ textShadow: '0px 0px 16px #7000FF' }}
        >
          Announcements
        </h1>,
        <AddAnnouncement isAdmin={isAdmin} />,
        <AnnouncementList isAdmin={isAdmin} />,
      ]}
    />
  );
}

export default Announcement;
