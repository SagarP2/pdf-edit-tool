import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home2.css";
import snippetPreviewImage from "./Homeimage.png";
const Home2 = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/App");
  };

  return (
    <div className="home-container">
      <div className="intro-section">
        <h2 className="intro-title">PDFEDIT</h2>
        <h1 className="main-title">Your personal PDF Tool library</h1>
        <p className="intro-text">
          PDFEDIT is a comprehensive suite of tools designed to work with PDF
          files. Our platform offers a wide range of features for manipulating,
          converting, and managing PDFs to meet all your document needs. Whether
          you need to merge, split, compress, or convert PDFs, PDFEDIT provides
          easy-to-use solutions to enhance your productivity and streamline your
          workflow.
        </p>
        <div className="button-container">
          <button className="btn-77" onClick={handleSignUpClick}>
            Explore Tools
          </button>
        </div>
      </div>
      <br/>
      <div className="snippet-preview">
        <img
          src={snippetPreviewImage}
          alt="Snippet Preview"
          className="snippet-image"
        />
      </div>
    </div>
  );
};

export default Home2;
