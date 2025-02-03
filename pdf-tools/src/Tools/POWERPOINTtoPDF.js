import React, { useState } from "react";
import Header from "../components/Header";
import "./PDF.css";
import JSZip from "jszip";
import { PDFDocument, rgb } from "pdf-lib";

function POWERPOINTtoPDF() {
  const [pptFile, setPptFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setPptFile(selectedFile);
      setError(null);
    }
  };

  const extractSlidesFromPPT = async (file) => {
    const zip = new JSZip();
    const content = await zip.loadAsync(file);
    const slidePromises = [];

    content.folder("ppt/slides").forEach((relativePath, file) => {
      slidePromises.push(file.async("string"));
    });

    const slides = await Promise.all(slidePromises);
    return slides.map((slide, index) => ({
      text: extractTextFromSlide(slide),
      index: index + 1,
    }));
  };

  const extractTextFromSlide = (slide) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(slide, "application/xml");
    const texts = xmlDoc.getElementsByTagName("a:t");
    let slideText = "";
    for (let i = 0; i < texts.length; i++) {
      slideText += texts[i].textContent + " ";
    }
    return slideText.trim();
  };

  const convertToPDF = async () => {
    if (!pptFile) return;

    setIsLoading(true);
    setError(null);

    try {
        const slides = await extractSlidesFromPPT(pptFile);
        if (!slides.length) {
            throw new Error("No slides extracted from the PowerPoint file.");
        }

        const pdfDoc = await PDFDocument.create();
        const pageMargin = 50;
        const pageWidth = 600;
        const pageHeight = 800;
        const fontSize = 12;

        const pageIndices = []; // Store indices of non-empty pages

        // Create pages and add text
        for (let slide of slides) {
            let currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
            let currentText = slide.text;
            let yOffset = pageHeight - pageMargin;

            let hasContent = false;

            while (currentText.length > 0) {
                const pageText = currentText.slice(0, 1000);
                currentText = currentText.slice(1000);

                currentPage.drawText(pageText, {
                    x: pageMargin,
                    y: yOffset,
                    size: fontSize,
                    color: rgb(0, 0, 0),
                    maxWidth: pageWidth - 2 * pageMargin,
                });

                yOffset -= 1.5 * fontSize;

                hasContent = true;

                if (yOffset <= pageMargin) {
                    currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
                    yOffset = pageHeight - pageMargin;
                }
            }

            if (hasContent) {
                pageIndices.push(pdfDoc.getPageCount() - 1); // Add the index of the last added page
            }
        }

        if (pageIndices.length === 0) {
            throw new Error("No content to include in the PDF.");
        }

        // Create a new PDF document
        const newPdfDoc = await PDFDocument.create();

        for (const index of pageIndices) {
            const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [index]);
            newPdfDoc.addPage(copiedPage);
        }

        const pdfBytes = await newPdfDoc.save();
        const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
        const pdfFile = new File([pdfBlob], "PowerPointToPDF.pdf", { type: "application/pdf" });
        setPdfFile(pdfFile);
    } catch (err) {
        setError(`An error occurred: ${err.message}`);
        console.error("Conversion error:", err);
    } finally {
        setIsLoading(false);
    }
};



  const downloadPDF = () => {
    if (pdfFile) {
      const url = URL.createObjectURL(pdfFile);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = pdfFile.name;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  };

  return (
    <div className="pdf-container">
      <Header />
      <div className="container">
        <h1>Convert PowerPoint to PDF</h1>
        <p>
          Convert your PowerPoint files into PDFs.
          <br />
          Powered by <span style={{ color: "red" }}>Solid Documents</span>.
        </p>
        <div className="file-upload">
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            accept=".pptx,.ppt"
            onChange={handleFileChange}
          />
          <div className="btnwallet">
            <button
              className="button"
              onClick={() => document.getElementById("fileInput").click()}
            >
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
          <br />
          <p1>Max file size 1MB. <a href="/">Sign Up</a> for more.</p1>
          <p>or drop here</p>
        </div>
        {isLoading && <p>Converting...</p>}
        {error && <p className="error">{error}</p>}
        {pptFile && (
          <div className="convert-btn">
            <button onClick={convertToPDF} className="btn-77">
              Convert to PDF
            </button>
          </div>
        )}
        <br />
        {pdfFile && (
          <div className="download-btn">
            <button onClick={downloadPDF} className="btn-77">
              Download PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default POWERPOINTtoPDF;