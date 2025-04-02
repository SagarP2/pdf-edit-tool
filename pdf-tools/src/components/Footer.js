import React, { useRef } from "react";
import "./Footer.css";
import pdfedit from "./pdfedit.png";
import { Link } from 'react-router-dom';

function Footer() {

  const home2Ref = useRef(null);
  const component5Ref = useRef(null);

  const scrollToComponent = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <footer className="footer">
      <div className="footer-left">
        <img src={pdfedit} alt="Logo" className="footer-logo" />
      </div>
      <p>
        Transforming PDF management with advanced network optimization for
        faster speeds, reduced latency, and full visibility.
      </p>
      <div className="footer-right">
      <div className="footer-column">
        <h3>PDFEdit</h3>
        <Link to="/">Home</Link>
        <Link to="/" onClick={() => scrollToComponent(home2Ref)}>
          Features
        </Link>
        <Link to="/app">Tools</Link>
        <Link to="/" onClick={() => scrollToComponent(component5Ref)}>
          FAQ
        </Link>
      </div>
        <div className="footer-column">
          <h3>Product Tools</h3>
          <a href="MergePDF">Merge PDF</a>
          <a href="SplitPDF">Split PDF</a>
          <a href="WORDtoPDF">Word to PDF </a>
          <a href="POWERPOINTtoPDF">PowerPoint to PDF</a>
        </div>
       
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-links">
          <a>Terms</a>
          <a>Privacy</a>
          <a>Cookies</a>
        </div>
        <div className="social-links">
          <a href="https://www.facebook.com/">
            <i className="fa fa-facebook"></i>
          </a>
          <a href="https://twitter.com/">
            <i className="fa fa-twitter"></i>
          </a>
          <a href="https://in.linkedin.com/">
            <i className="fa fa-linkedin"></i>
          </a>
          <a href="https://www.youtube.com/">
            <i className="fa fa-youtube"></i>
          </a>
        </div>
        <p>© PDFEdit 2024 ® - Your PDF Editor</p>
      </div>
    </footer>
  );
}

export default Footer;
