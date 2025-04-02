import React from "react";
import "./Header.css";

import pdfeditlogo from "./pdfedit.png";

const Header1 = () => {
  return (
    <header className="header">
      <img src={pdfeditlogo} alt="pdfeditlogo" className="logo-image" />
    </header>
  );
};

export default Header1;
