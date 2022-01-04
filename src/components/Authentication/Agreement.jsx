import React from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import FormContainer from "../Container/FormContainer";

function Agreement({ onClose }) {
  return (
    <FormContainer
      textAlign="start"
      childComponents={[
        <Card raised>
          <CardHeader
            title="Personal Details Consent"
            action={
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            }
          />
          <CardContent>
            <Typography>
              I, as a participant of the CREATION 2022, consent to National
              University of Singapore (NUS) through NUSSU commIT collecting,
              using and/or disclosing my personal data to the startups supported
              by NUS Enterprise for internship opportunities.
            </Typography>
          </CardContent>
        </Card>,
      ]}
    />
  );
}

export default Agreement;
