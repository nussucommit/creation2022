import Timeline1 from "../../images/Timeline1.png";
import Timeline2 from "../../images/Timeline2.png";
import Timeline3 from "../../images/Timeline3.png";
import Timeline4 from "../../images/Timeline4.png";
import Timeline5 from "../../images/Timeline5.png";
import Timeline6 from "../../images/Timeline6.png";



export default function Timeline({ date, title, content, index }) {
  const timelineImage = [Timeline1, Timeline2, Timeline3, Timeline4, Timeline5, Timeline6];
  const colorArray = ["#FF66AB", "#F72585", "#D30564", "#AB004E","#8E0041","#67002F"];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: "20px",
        alignItems: "center",
        position: "relative",
        zIndex: 2,
      }}
    >
      <span className={"timelineDate"}>{date}</span>
      <div
        className={"homeTimeline"}
        style={{
          backgroundImage: `url('${timelineImage[index - 1]}')`,
        }}
      >
        <div>
          <div style={{ display: "flex", justifyContent:"space-between" }}>
            <div className={"timelineTitle"}>{title}</div>
            <div
              style={{
                right: "0%",
                fontFamily: "Raider Crusader",
                fontSize: "48px",
                marginTop: "-15px",
                color: `${colorArray[index - 1]}`,
              }}
            >
              {index}
            </div>
          </div>
          <br></br>
          <div className={"timelineContent"}>{content}</div>
        </div>
      </div>
    </div>
  );
}
