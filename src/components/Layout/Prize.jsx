function Prize({ imageURL, title, awardType }) {
  return (
    <div style={{ margin: "20px" }}>
      <div className={"hexagonShadow"}>
      <span style={{ color: "white", fontSize:"30px", fontFamily:"Raider Crusader" }}>{awardType}</span>
        <div className={"hexagon"}>
          <img
            src={require(`../../images/${imageURL}`)}
            alt={"prize"}
            style={{ width: "151px" }}
          />
        </div>

        <span style={{ color: "white", whiteSpace:"pre-line", lineHeight:"30px" }}>{title}</span>
      </div>
    </div>
  );
}

export default Prize;
