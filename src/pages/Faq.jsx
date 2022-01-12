import faqs from "../data/faq.json";

function Faq() {
  return (
    <div className="mainBody">
      <h1
        className="mainTitle"
        style={{ textShadow: '0px 0px 16px #ED8F03' }}
      >
        Frequently Asked Questions
      </h1>
      <br />
      <div className="mainContent" style={{padding: "0 15vw"}}>
        {faqs.map((faq, index) => (
          <div key={index} style={{ marginBottom: '80px' }}>
            <h2 className="secondaryTitle" style={{ letterSpacing: '1px' }}>
              {index + 1}. {faq.question}
            </h2>
            <span style={{ color: 'white', lineHeight: '30px', whiteSpace:"pre-line" }}>
              {faq.answer}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Faq;
