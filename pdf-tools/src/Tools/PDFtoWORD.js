import React, { useState, useEffect } from "react";
import { Document, Packer, Paragraph, TextRun, ImageRun, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';
import * as pdfjsLib from 'pdfjs-dist';
import Header from "../components/Header";
import "./PDF.css";

function PDFtoWORD() {
  const [file, setFile] = useState(null);
  const [isConverting, setIsConverting] = useState(false);

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        alert("Please select a PDF file.");
        return;
      }
      if (selectedFile.size > 5* 1024 * 1024) {
        alert("File size exceeds 1MB limit. Please choose a smaller file.");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  const extractContentFromPDF = async (pdfFile) => {
    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let content = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const images = await extractImagesFromPage(page);

      const pageText = textContent.items.map(item => {
        const fontSize = item.transform[0] || 24;
        const fontName = item.fontName || 'default';
        const isBold = fontName.includes('Bold');
        const isItalic = fontName.includes('Italic');
        const isUnderline = item.hasOwnProperty('underline') ? item.underline : false;

        const x = item.transform[4];
        const y = item.transform[5];

        return {
          text: item.str,
          font: fontName,
          fontSize: fontSize,
          bold: isBold,
          italic: isItalic,
          underline: isUnderline,
          x: x,
          y: y
        };
      });

      content.push({ text: pageText, images });
    }

    return content;
  };

  const extractImagesFromPage = async (page) => {
    const operatorList = await page.getOperatorList();
    const images = [];

    for (let i = 0; i < operatorList.fnArray.length; i++) {
      if (operatorList.fnArray[i] === pdfjsLib.OPS.paintImageXObject) {
        const img = await page.objs.get(operatorList.argsArray[i][0]);
        if (!img || !img.data) continue;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;

        const imageData = new ImageData(new Uint8ClampedArray(img.data), img.width, img.height);
        ctx.putImageData(imageData, 0, 0);
        const dataUrl = canvas.toDataURL('image/png');
        images.push(dataUrl);
      }
    }
    return images;
  };

  const splitTextIntoRuns = (items) => {
    return items.map(item => new TextRun({
      text: item.text,
      font: item.font,
      bold: item.bold,
      italic: item.italic,
      underline: item.underline,
      size: item.fontSize || 24
    }));
  };

  const convertToWord = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    setIsConverting(true);
    try {
      // Extract content from PDF
      const content = await extractContentFromPDF(file);

      // Create a new Word document
      const doc = new Document({
        sections: content.map((pageContent, index) => ({
          properties: {},
          children: [
            ...pageContent.text.map(item => {
              return new Paragraph({
                children: splitTextIntoRuns([item]),
                alignment: AlignmentType.LEFT,
                indentation: {
                  left: item.x || 0, // Basic example; adjust based on actual layout
                  right: item.y || 0 // Example; adjust based on actual layout
                },
                spacing: { before: 200 } // Example spacing; adjust as needed
              });
            }),
            ...pageContent.images.map(img => {
              const base64Data = img.split(',')[1];
              const buffer = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
              return new ImageRun({
                data: buffer,
                transformation: {
                  width: 300, // Adjust width and height as needed
                  height: 200
                }
              });
            })
          ]
        }))
      });

      // Generate and save the Word document
      const blob = await Packer.toBlob(doc);
      saveAs(blob, 'converted_document.docx');

      alert("Conversion completed!");
    } catch (error) {
      console.error("Error converting file:", error);
      alert(`Failed to convert file: ${error.message}. Please try again.`);
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="pdf-container">
      <Header />
      <div className="container">
        <h1>Convert PDF to WORD</h1>
        <p>
          Convert PDF documents to WORD.
          <br /> Powered by
          <span style={{ color: "red" }}> Client-side Conversion</span>.
        </p>

        <div className="file-upload">
          <div className="btnwallet">
            <button className="button" onClick={handleButtonClick}>
              <span className="button__text">+ Choose File</span>
              <svg
                className="button__svg"
                role="presentational"
                viewBox="0 0 600 600"
              >
                <defs>
                  <clipPath id="myClip">
                    <rect x="0" y="0" width="100%" height="50%" />
                  </clipPath>
                </defs>
                <g clipPath="url(#myClip)">
                  <g id="money">
                    <path
                      d="M441.9,116.54h-162c-4.66,0-8.49,4.34-8.62,9.83l.85,278.17,178.37,2V126.37C450.38,120.89,446.56,116.52,441.9,116.54Z"
                      fill="#699e64"
                      stroke="#323c44"
                      strokeMiterlimit="10"
                      strokeWidth="14"
                    />
                    <path
                      d="M424.73,165.49c-10-2.53-17.38-12-17.68-24H316.44c-.09,11.58-7,21.53-16.62,23.94-3.24.92-5.54,4.29-5.62,8.21V376.54H430.1V173.71C430.15,169.83,427.93,166.43,424.73,165.49Z"
                      fill="#699e64"
                      stroke="#323c44"
                      strokeMiterlimit="10"
                      strokeWidth="14"
                    />
                  </g>
                  <g id="creditcard">
                    <path
                      d="M372.12,181.59H210.9c-4.64,0-8.45,4.34-8.58,9.83l.85,278.17,177.49,2V191.42C380.55,185.94,376.75,181.57,372.12,181.59Z"
                      fill="#a76fe2"
                      stroke="#323c44"
                      strokeMiterlimit="10"
                      strokeWidth="14"
                    />
                    <path
                      d="M347.55,261.85H332.22c-3.73,0-6.76-3.58-6.76-8v-35.2c0-4.42,3-8,6.76-8h15.33c3.73,0,6.76,3.58,6.76,8v35.2C354.31,258.27,351.28,261.85,347.55,261.85Z"
                      fill="#ffdc67"
                    />
                    <path
                      d="M249.73,183.76h28.85v274.8H249.73Z"
                      fill="#323c44"
                    />
                  </g>
                </g>
                <g id="wallet">
                  <path
                    d="M478,288.23h-337A28.93,28.93,0,0,0,112,317.14V546.2a29,29,0,0,0,28.94,28.95H478a29,29,0,0,0,28.95-28.94h0v-229A29,29,0,0,0,478,288.23Z"
                    fill="#a4bdc1"
                    stroke="#323c44"
                    strokeMiterlimit="10"
                    strokeWidth="14"
                  />
                  <path
                    d="M512.83,382.71H416.71a28.93,28.93,0,0,0-28.95,28.94h0V467.8a29,29,0,0,0,28.95,28.95h96.12a19.31,19.31,0,0,0,19.3-19.3V402a19.3,19.3,0,0,0-19.3-19.3Z"
                    fill="#a4bdc1"
                    stroke="#323c44"
                    strokeMiterlimit="10"
                    strokeWidth="14"
                  />
                  <path
                    d="M451.46,435.79v7.88a14.48,14.48,0,1,1-29,0v-7.9a14.48,14.48,0,0,1,29,0Z"
                    fill="#a4bdc1"
                    stroke="#323c44"
                    strokeMiterlimit="10"
                    strokeWidth="14"
                  />
                  <path
                    d="M147.87,541.93V320.84c-.05-13.2,8.25-21.51,21.62-24.27a42.71,42.71,0,0,1,7.14-1.32l-29.36-.63a67.77,67.77,0,0,0-9.13.45c-13.37,2.75-20.32,12.57-20.27,25.77l.38,221.24c-1.57,15.44,8.15,27.08,25.34,26.1l33-.19c-15.9,0-28.78-10.58-28.76-25.93Z"
                    fill="#7b8f91"
                  />
                  <path
                    d="M148.16,343.22a6,6,0,0,0-6,6v92a6,6,0,0,0,12,0v-92A6,6,0,0,0,148.16,343.22Z"
                    fill="#323c44"
                  />
                </g>
              </svg>
            </button>
          </div>
          <br/>
          <input
            type="file"
            id="fileInput"
            accept=".pdf"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
          <p1>
            Max file size 5MB. <a href="/">Sign Up</a> for more.
          </p1>
          <p>or drop here</p>
        </div>

        {file && (
          <div>
            <p>Selected file: {file.name}</p>
            <button
              className="btn-77"
              onClick={convertToWord}
              disabled={isConverting}
            >
              {isConverting ? "Converting..." : "Convert to WORD"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PDFtoWORD;
