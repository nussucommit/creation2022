// import { useState } from "react";

// import { Button } from "@mui/material";

// import { db } from "../firebase/firebase-config";
// import { collection, addDoc } from "firebase/firestore";

function Contact() {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [inquiry, setInquiry] = useState("");

  // function Validate(e) {
  //   e.preventDefault();
  //   if (name === "" || email === "" || inquiry === "") {
  //     alert("Please provide us your name, email, and your inquiry");
  //   } else if (email.includes("@") === false) {
  //     return alert("Please provide us a valid email");
  //   } else {
  //     HandleSubmit(e);
  //   }
  // }

  // function HandleSubmit(e) {
  //   e.preventDefault();

  //   addDoc(collection(db, "contact"), {
  //     name: name,
  //     email: email,
  //     inquiry: inquiry,
  //     to: ["creation.committee@nussucommit.com"],
  //     message: {
  //       subject: "New inquiry for CREATION 2022",
  //       html: "From " + name + " (" + email + "): " + inquiry,
  //     },
  //   })
  //     .then(() => {
  //       alert("Your message has been submitted👍");
  //     })
  //     .catch((error) => {
  //       alert(error.message);
  //     });

  //   setName("");
  //   setEmail("");
  //   setInquiry("");
  // }

  return (
    <div className="mainBody" style={{ height: "100vh" }}>
      <h1
        className={"mainTitle"}
        style={{ textShadow: "0px 0px 15px #B0B0B0" }}
      >
        Contact Us
      </h1>
<br/>
      {/* <form
        onSubmit={Validate}
     
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          fontSize:"inherit",
        }}
      >
        <input
          placeholder="Name"
          id="name"
          className={"contactInput"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <br></br>
        <input
          placeholder="Email"
          id="email"
          className={"contactInput"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <br></br>
        <textarea
          style={{ height: "100px" }}
          placeholder="Your Inquiry"
          className={"contactInput"}
          id="inquiry"
          value={inquiry}
          onChange={(e) => setInquiry(e.target.value)}
        ></textarea>
        <br></br>
        <br></br>
        <Button  type="submit"  variant="contained" width={"80%"}>
          Submit
        </Button>
      </form> */}
      <p style={{color:"white", textAlign:"center"}}>Please submit your inquiry to <a style={{color:"white"}} href="mailto:creation.committee@nussucommit.com">creation.committee@nussucommit.com</a>. Thank you :).</p>
    </div>
  );
}

export default Contact;
