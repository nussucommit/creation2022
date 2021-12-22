// import homeChallengeBackground from "../images/homeChallengeBackground.png";
import Challenge from "../components/Layout/HomeChallenge";
import Timeline from "../components/Layout/CompetitionTimeline";
import Prize from "../components/Layout/Prize";

export default function Home() {
  return (
    <div className={"homeBody"}>
      {/* Cover Photo Gradient */}
      <div
        style={{
          background:
            "linear-gradient(0deg, #111111 0%, rgba(255, 255, 255, 0) 20%)",
          height: "700px",
        }}
      ></div>
      {/* Challenge */}
      <div
        style={{ backgroundColor: "rgba(255,255,255,0.2)", padding: "30px" }}
      >
        <h1
          className={"mainTitle"}
          style={{ textShadow: "0px 4px 4px #370005" }}
        >
          Overview of Challenges
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Challenge
            title={"2020 NUSSU Welfare Day"}
            content={
              "Design the AY2020/21 Welfare Diary! The theme of the journal is jewel toned colours with writings in block letters style. The design of the journal should appeal to the NUS student community."
            }
          ></Challenge>
          <Challenge
            title={"Key Visual for NUS Commencement Class Giving 2021"}
            content={
              "Create a new, refreshed key visual for Commencement Class Giving 2021! The design should inspire pride in being affiliated with NUS and encourage students to mark their graduation with a gift in support of their juniors."
            }
          ></Challenge>
          <Challenge
            title={"Mascot for NUS IT Security Awareness Campaign"}
            content={
              "Create and design a Mascot character, for branding, which can be used in IT Security Awareness Campaign!"
            }
          ></Challenge>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>

      {/* Timeline */}
      <div style={{ padding: "30px", paddingBottom: "80px" }}>
        <h1
          className={"mainTitle"}
          style={{ textShadow: "0px 4px 4px #370005" }}
        >
          Competition Timeline
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Timeline
            index={1}
            date={"20 Jan 2020"}
            title={"CHALLENGE STATEMENT RELEASE"}
            content={
              "The challenge statements will be released on our website on 20th January 2020. Sign-up will open on this website from 20th January 2020 until the deadline of submission on 21st February 2020."
            }
          ></Timeline>
          <Timeline
            index={2}
            date={"8 Feb 2020"}
            title={"ADVANCED PHOTOSHOP WORKSHOP"}
            content={
              "Once you have officially signed up as a participant, you can join our free workshop for advanced skills in Photoshop conducted by Acadia Training. The workshop will be on 8th February 2020. Sign up here!"
            }
          ></Timeline>
          <Timeline
            index={3}
            date={"21 Feb 2020"}
            title={"DEADLINE FOR SUBMISSION"}
            content={
              "Participants can submit their design through our website by logging in. Submissions must be done before 21st February 2020 at 18:00."
            }
          ></Timeline>
          <Timeline
            index={4}
            date={"24 Feb 2020"}
            title={"PITCHING & CLOSING CEREMONY"}
            content={
              "Participants are invited to our closing ceremony held at Mochtar Riady Building(Revised) from 09:00 to 14:00 Participants will get a chance to pitch their designs to the judges."
            }
          ></Timeline>
        </div>
      </div>

      {/* Prizes */}
      <div
        style={{
          background: "#323232",
          boxShadow: "inset 0px 20px 50px 20px #1F1F1F",
          padding: "25px",
          paddingBottom: "50px",
        }}
      >
        <h1
          className={"mainTitle"}
          style={{ textShadow: "0px 0px 15px #7000FF" }}
        >
          Prizes
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Prize imageURL={"iPad.jpeg"} title={"iPad"}></Prize>
          <Prize imageURL={"iPad.jpeg"} title={"iPad"}></Prize>
          <Prize imageURL={"iPad.jpeg"} title={"iPad"}></Prize>
        </div>
        <h2
          className={"mainTitle"}
          style={{
            textShadow: "0px 0px 15px #7000FF",
            fontSize: "36px",
            margin: "40px",
          }}
        >
          And Many More Prizes!
        </h2>
      </div>
    </div>
  );
}
