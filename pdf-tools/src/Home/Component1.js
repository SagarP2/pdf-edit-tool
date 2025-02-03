import React from "react";
import "./Component1.css";

const Container = () => {
  return (
    <div className="container1">
      <div className="left-section">
        <h1>What is PDFEDIT ?</h1><br/>
        <p>
          PDFEDIT is a website that provides a suite of PDF tools for various
          tasks. It's designed for anyone who needs to work with PDF files,
          offering easy-to-use solutions for common PDF operations.
        </p>
      </div>
      
      <div className="right-section">
        <div className="feature-item">
          <div className="feature-content">
            <h2>Your very own PDF tool library</h2>
            <p>
              Library of personal PDF Tools that you can use to organize your
              own Documents.
            </p>
          </div>
        </div>
        <div className="feature-item">
          <div className="feature-content">
            <h2>+20 PDF Tools</h2>
            <p>
              From basic PDF Tools actions to advanced. You can find it all.
            </p>
          </div>
        </div>
        <div className="feature-item">
          <div className="feature-content">
            <h2>24/7 Customer Service</h2>
            <p>
              The image shows various PDF tools available, including:
            </p>
            <ul>
              <li>Merge PDF</li>
              <li>Split PDF</li>
              <li>Compress PDF</li>
              <li>Convert PDF to Word</li>
              <li>Convert PDF to Excel</li>
              <li>Convert PDF to PPT</li>
              <li>Convert PDF to JPG</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;