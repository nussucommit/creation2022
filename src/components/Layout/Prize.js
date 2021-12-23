export default function Prize({ imageURL, title }) {
  return (
    <div style={{ margin: "20px" }}>
      <div className={"hexagonShadow"}>
        <div className={"hexagon"}>
          <img
            src={require(`../../images/${imageURL}`)}
            alt={"prize"}
            style={{ width: "151px" }}
          />
        </div>

        <span style={{ color: "white" }}>{title}</span>
      </div>
    </div>
  );
}