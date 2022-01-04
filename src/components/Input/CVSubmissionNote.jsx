import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function CVSubmissionNote({ onToggleOpenAgreement }) {
  return (
    <Card
      raised
      sx={{ mx: "5vw", my: "2rem" }}
      style={{ boxShadow: "0px 0px 10px #ffffff", textAlign: "start" }}
    >
      <CardContent>
        <Typography>
          * Please notice that it is not compulsory to submit your CV for
          joining the competition
        </Typography>
        <br />
        <Typography>
          * Please indicate your period of availability for potential internship
          opportunities in your CV
        </Typography>
        <br />
        <Typography>
          * More information about the collection of CVs can be found under
          <Button size="small" onClick={onToggleOpenAgreement}>
            Rules and Regulations
          </Button>
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CVSubmissionNote;
