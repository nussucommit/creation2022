function Challenge({ title, content }) {
  return (
    <div
      className={"homeChallenge"}
      style={{
        display: 'flex',
        flexDirection: 'column',
        margin: '20px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h2
          className={"secondaryTitle"}
          style={{ color: '#434343', textAlign: 'center' }}
        >
          {title}
        </h2>
        <span
          style={{
            lineHeight: '20px',
            textAlign: 'center',
            alignSelf: 'center',
          }}
        >
          {content}
        </span>
        <br></br>
      </div>
    </div>
  );
}

export default Challenge;
