import rules from "../data/rules_and_regulations.json";

function Rules() {
  return (
    <div className={"mainBody"}>
      <h1
        className={"mainTitle"}
        style={{ textShadow: "0px 0px 16px #F72585" }}
      >
        Rules and Regulations
      </h1>
      <br />
      <div style={{ paddingLeft: "15vw", paddingRight: "15vw" }}>
        {rules.map((rule, i) =>
          rule.sectionTitle === "Selection Process" ? (
            <div key={i}>
              <h1 className={"secondaryTitle"}>{rule.sectionTitle}</h1>
              <ul key={i}>
                {rule.contentRule.map((content, i) =>
                  typeof content === "string" ? (
                    <li key={i}>{content}</li>
                  ) : (
                    content.map((prize, index) => (
                      <div style={{ paddingInlineStart: "20px" }} key={index}>
                        <div
                          style={{
                            color: "white",
                            fontFamily: "Nova Flat",
                            lineHeight: "40px",
                          }}
                        >
                          {index + 1}. {prize.prizeName}
                        </div>
                        <ul key={index} style={{ paddingInlineStart: "40px" }}>
                          {prize.details.map((detail, i) => (
                            <li key={i}>{detail}</li>
                          ))}
                        </ul>
                        <br />
                      </div>
                    ))
                  )
                )}
              </ul>
              <br />
              <br />
            </div>
          ) : rule.sectionTitle !== "General Rules" ? (
            <div key={rule.sectionTitle}>
              <h1 className={"secondaryTitle"}>{rule.sectionTitle}</h1>
              <ul key={i}>
                {rule.contentRule.map((content, i) => (
                  <li key={i}>{content}</li>
                ))}
              </ul>
              <br />
              <br />
            </div>
          ) : (
            <div key={rule.sectionTitle}>
              <h1 key={i} className={"secondaryTitle"}>
                {rule.sectionTitle}
              </h1>

              <ul key={rule.sectionTitle}>
                {rule.contentRule.map((content, i) =>
                  typeof content === "string" ? (
                    <li key={i}>{content}</li>
                  ) : (
                    <ul key={i}>
                      {content.map((detail, i) => (
                        <div key={i} style={{ paddingInlineStart: "20px" }}>
                          <li key={i}> {detail}</li>
                        </div>
                      ))}
                    </ul>
                  )
                )}
              </ul>

              <br />
              <br />
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Rules;
