// import React, { useState } from "react";

// import Fab from "@mui/material/Fab";
// import AddIcon from "@mui/icons-material/Add";
// import Backdrop from "@mui/material/Backdrop";

// import PageContainer from "../components/Container/PageContainer";
// import SubmittedFileList from "../components/Submission/SubmittedFileList";
// import FileUploadForm from "../components/Submission/FileUploadForm";

// function Submission() {
//   const [openUploadForm, setOpenUploadForm] = useState(false);
//   const [challengeSubmitStatus, setChallengeSubmitStatus] = useState([]);

//   const closeUploadFormHandler = () => setOpenUploadForm(false);

//   const toggleOpenUploadFormHandler = () =>
//     setOpenUploadForm((openUploadForm) => !openUploadForm);

//   const PageTitle = () => (
//     <h1 className="mainTitle" style={{ textShadow: "0px 0px 16px #08ED03" }}>
//       Submission
//     </h1>
//   );

//   const AddSubmissionButton = () => (
//     <Fab
//       color="primary"
//       onClick={toggleOpenUploadFormHandler}
//       sx={{ position: "fixed", bottom: 30, right: 30 }}
//     >
//       <AddIcon />
//     </Fab>
//   );

//   return (
//     <PageContainer
//       childComponents={[
//         <PageTitle />,
//         <AddSubmissionButton />,
//         <SubmittedFileList checkSubmit={setChallengeSubmitStatus} />,
//         <Backdrop
//           sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
//           open={openUploadForm}
//         >
//           <FileUploadForm
//             challengeSubmitStatus={challengeSubmitStatus}
//             onCancel={closeUploadFormHandler}
//           />
//         </Backdrop>,
//       ]}
//     />
//   );
// }

// export default React.memo(Submission);

import React from 'react'
export default class ChallengesDetail extends React.Component{
    render() {
        return (
            <div className='mainBody challenge challengeContent' style={{overflow:'hidden'}}>
                <h1 className="mainTitle" style={{ textShadow: "0px 0px 16px #08ED03" }}>Submission</h1>
                <div style={{border:'2px #fff solid', padding:'2vw', borderRadius:'10px'}}>
                  <h1 className='secondaryTitle challengeSecondaryTitle' style={{color:"#bfa", lineHeight:"35px"}}>Please submit your artwork here:</h1>
                  <h3 className='challengeTertiaryTitle' style={{lineHeight: '34px', fontFamily:'Nova Flat',margin:'0px'}}>
                    <ul style={{marginLeft:'3vw'}}>
                      <li style={{marginTop:'10px'}}><a href='https://forms.office.com/r/TwkPqhYMCR' style={{color:"#fff"}}>
                        Challenge 1: Key Visual for NUS Commencement Class Giving 2023
                      </a></li>
                      <li style={{marginTop:'10px'}}><a href='https://forms.office.com/Pages/ResponsePage.aspx?id=Xu-lWwkxd06Fvc_rDTR-go8_UFfHspRIl59LqRm4AhdUNVY3WEg3UkZCVEU2RVlIR1dKMlRRTzFNVC4u' style={{color:"#fff"}}>
                        Challenge 2: Digital Poster for Phishing via Email, Calls and SMS
                      </a></li>
                      <li style={{marginTop:'10px'}}><a href='https://forms.office.com/Pages/ResponsePage.aspx?id=Xu-lWwkxd06Fvc_rDTR-go8_UFfHspRIl59LqRm4AhdUOE9VOE5OMFcwOTVMVVRMTkNIOUsxMUlUMy4u' style={{color:"#fff"}}>
                        Challenge 3: Digital Poster for Business Email Compromise
                      </a></li>
                      <li style={{marginTop:'10px'}}><a href='https://forms.office.com/r/BiCxMdTGft' style={{color:"#fff"}}>
                        Challenge 4: Digital Poster to Raise Awareness of Ransomware
                      </a></li>
                    </ul>
                  </h3>
                </div>
                <br/>
                <br/>
                <br/>
                <div style={{border:'2px #fff solid', padding:'2vw', borderRadius:'10px'}}>
                  <h1 className='secondaryTitle challengeSecondaryTitle' style={{color:"#bfa", lineHeight:"35px"}}>Please submit your CV here:</h1>
                  <h3 className='challengeTertiaryTitle' style={{lineHeight: '34px', fontFamily:'Nova Flat',margin:'0px'}}>
                    <ul style={{marginLeft:'3vw'}}>
                      <li style={{marginTop:'10px'}}><a href='https://forms.office.com/r/PEkVb6Pq5E' style={{color:"#fff"}}>CV Submission</a></li>
                    </ul>
                  </h3>
                </div>
            </div>
        )
    }
}
