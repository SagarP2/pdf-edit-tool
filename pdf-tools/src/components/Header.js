import React, { useState } from "react";
import "./Header.css";
import pdfedit from "./pdfedit.png";
import { Link } from "react-router-dom";
import toolsData from "../toolsData";

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="header1">
      <div className="logo">
        <Link to="/App">
          <img
            src={pdfedit}
            alt="pdfedit Logo"
            style={{ width: "140px", height: "auto" }}
          />
        </Link>
      </div>
      <nav className="nav">
        <Link to="/MergePDF">MERGE PDF</Link>
        <Link to="/SplitPDF">SPLIT PDF</Link>
        <Link to="/CompressPDF">COMPRESS PDF</Link>
        <Link to="/PDFtoWORD">PDF TO Word</Link>
        <div
          className="dropdown"
          onMouseEnter={toggleDropdown}
          onMouseLeave={toggleDropdown}
        >
          <button className="dropbtn">ALL PDF TOOLS</button>
          <div className={`dropdown-content ${dropdownOpen ? "show" : ""}`}>
            {toolsData.map((tool, index) => (
              <Link key={index} to={tool.link}>
                {tool.title}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      <div className="auth-buttons">
        {/*<button className="login-button">Log In</button>
        <button className="signup-button">Sign Up</button> */}
      </div>
    </header>
  );
}

export default Header;
