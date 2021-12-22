import { useContext } from "react";

import AuthContext from "../store/auth-context";
import AddAnnouncement from "../components/Announcement/AddAnnouncement";
import AnnouncementList from "../components/Announcement/AnnouncementList";
import PageContainer from "../components/Container/PageContainer";
import Typography from "@mui/material/Typography";

function Announcement() {
  const authCtx = useContext(AuthContext);
  const isSignedIn = authCtx.isSignedIn;
  const isAdmin =
    isSignedIn && authCtx.user.uid === "4boshrfLGyRfR2nakesjTx0faKx1";

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
