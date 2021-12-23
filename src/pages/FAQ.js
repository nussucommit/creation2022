import faqs from "./faq.json";

export default function FAQ() {
  return (
    <div className={"mainBody"}>
      <h1
        className={"mainTitle"}
        style={{ textShadow: "0px 0px 15px #ED8F03" }}
      >
        Frequently Asked Question
      </h1>
      <br />
      <div style={{ paddingLeft: "15vw", paddingRight: "15vw" }}>
        {faqs.map((faq, index) => (
          <div style={{ marginBottom: "80px" }}>
            <h2 className={"secondaryTitle"} style={{ letterSpacing: "1px" }}>
              {index + 1}. {faq.question}
            </h2>
            <span style={{ color: "white", lineHeight: "30px" }}>
              {faq.answer}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
