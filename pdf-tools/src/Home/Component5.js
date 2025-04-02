import React, { useState } from 'react';
import './Component5.css';

const Component5 = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="footer-container">
      <div className="faq-section">
        <h2 className="faq-title">FAQ</h2>
        <h1 className="main-title">You ask, we answer</h1>
      </div>
      <div className="faq-item" onClick={() => toggle(0)}>
        <div className="faq-question">
          <h2>What is PDFEDIT ?</h2>
          <span>{activeIndex === 0 ? '-' : '+'}</span>
        </div>
        {activeIndex === 0 && (
          <div className="faq-answer">
            <p>
              PDFEdit is an online service that provides a suite of tools to work with PDF files. It allows you to merge, split, compress, convert, and edit PDF files easily and quickly. The platform is designed to be user-friendly and accessible to everyone.
            </p>
          </div>
        )}
      </div>
      <div className="faq-item" onClick={() => toggle(1)}>
        <div className="faq-question">
          <h2>Is PDFEDIT free to use?</h2>
          <span>{activeIndex === 1 ? '-' : '+'}</span>
        </div>
        {activeIndex === 1 && (
          <div className="faq-answer">
            <p>
              Yes, PDFEdit offers a range of free tools to use without any cost. However, there are also premium features and subscription plans available that provide additional functionalities, such as batch processing, higher file size limits, and access to more advanced tools.
            </p>
          </div>
        )}
      </div>
      <div className="faq-item" onClick={() => toggle(2)}>
        <div className="faq-question">
          <h2>How secure is my data with PDFEDIT ?</h2>
          <span>{activeIndex === 2 ? '-' : '+'}</span>
        </div>
        {activeIndex === 2 && (
          <div className="faq-answer">
            <p>
              PDFEdit takes data security seriously. All file transfers are encrypted using HTTPS, ensuring that your files are protected during upload and download. Additionally, files are deleted from their servers after a few hours to maintain privacy and security.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Component5;
