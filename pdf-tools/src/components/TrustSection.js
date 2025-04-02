import React from "react";
import "./TrustSection.css";
import logo1 from "./logo3.png";
import logo2 from "./logo2.png";
import logo3 from "./logo1.png";

function TrustSection() {
  return (
    <section className="trust-section">
      <h2>The PDF software trusted by millions of users</h2>
      <p>
      iLovePDF is your number one web app for editing PDF with ease. Enjoy all the tools you need to work efficiently with your digital documents while keeping your data safe and secure.
      </p>
      <div className="logomain">
        <img src={logo1} 
        alt="Logo 1"
        style={{ width: "30px", height: "auto", margin : "20px"}}/>
        <img src={logo2}
        alt="Logo 2"
        style={{ width: "40px", height: "auto", margin : "20px" }}/>
        <img src={logo3}
        alt="Logo 3"
        style={{ width: "40px", height: "auto", margin : "20px" }}/>
      </div>
    </section>
  );
}

export default TrustSection;
