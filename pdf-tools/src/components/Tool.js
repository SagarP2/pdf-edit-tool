// src/components/Tool.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Tool.css";

function Tool({ title, description, icon, link }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(link);
  };

  return (
    <div className="tool" onClick={handleClick}>
      <div className="tool-icon">
        <i className={icon} style={{ fontSize: 55 }}></i>
      </div>
      <br />
      <div className="tool-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default Tool;
