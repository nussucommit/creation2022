import { useContext } from "react";

import Typography from "@mui/material/Typography";

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
        <Typography variant="h4">Announcement</Typography>,
        <AddAnnouncement isAdmin={isAdmin} />,
        <AnnouncementList isAdmin={isAdmin} />,
      ]}
    />
  );
}

export default Announcement;
