import React from 'react';
import './Component2.css';
import Window from './Tools.png'

const Component2 = () => {
  return (
    <div className="component2-container">
      <div className="left-section">
        <img 
          src={Window} 
          alt="UI snippets preview" 
          className="image-preview"
        />
      </div>
      <div className="right-section">
        <h1>PDFEDIT offers a comprehensive suite of PDF tools to streamline your document workflow:</h1>
        <p>
          Available for you to explore, save, edit, create.
        </p>
        <ul>
          <li>Merge PDF: Combine multiple PDFs into one file</li>
          <li>Split PDF: Separate PDF pages into individual files</li>
          <li>Compress PDF: Reduce file size while maintaining quality</li>
          <li>PDF to Word: Convert PDFs to editable DOC/DOCX formats</li>
          <li>PDF to PowerPoint: Transform PDFs into editable presentations</li>
          <li>PDF to Excel: Convert PDF tables to spreadsheets</li>
        </ul>
      </div>
    </div>
  );
};

export default Component2;
