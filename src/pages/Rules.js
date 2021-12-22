import rules from "./rules_and_regulations.json";

export default function Rules() {
  return (
    <div className={"mainBody"}>
      <h1
        className={"mainTitle"}
        style={{ textShadow: "0px 0px 15px #F72585" }}
      >
        Rules and Regulations
      </h1>
      <br />
      <div style={{ paddingLeft: "15vw", paddingRight: "15vw" }}>
        {rules.map((rule) =>
          rule.sectionTitle === "Selection Process" ? (
            <div>
              <h1 className={"secondaryTitle"}>{rule.sectionTitle}</h1>
              <ul>
                {rule.contentRule.map((content) =>
                  typeof content === "string" ? (
                    <li>{content}</li>
                  ) : (
                    content.map((prize, index) => (
                      <div style={{ paddingInlineStart: "20px" }}>
                        <div
                          style={{
                            color: "white",
                            fontFamily: "Nova Flat",
                            lineHeight: "40px",
                          }}
                        >
                          {index + 1}. {prize.prizeName}
                        </div>
                        <ul style={{ paddingInlineStart: "40px" }}>
                          {prize.details.map((detail) => (
                            <li>{detail}</li>
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
            <div>
              <h1 className={"secondaryTitle"}>{rule.sectionTitle}</h1>
              <ul>
                {rule.contentRule.map((content) => (
                  <li>{content}</li>
                ))}
              </ul>
              <br />
              <br />
            </div>
          ) : (
            <div>
              <h1 className={"secondaryTitle"}>{rule.sectionTitle}</h1>
              <ul>
                {rule.contentRule.map((content) =>
                  typeof content === "string" ? (
                    <li>{content}</li>
                  ) : (
                    <ul>
                      {content.map((detail) => (
                        <div style={{ paddingInlineStart: "20px" }}>
                          <li> {detail}</li>
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
