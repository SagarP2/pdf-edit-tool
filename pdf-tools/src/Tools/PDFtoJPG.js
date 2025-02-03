import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist/webpack";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import Header from "../components/Header";
import "./PDF.css";
function PDFtoJPG() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [images, setImages] = useState([]);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [isSinglePage, setIsSinglePage] = useState(false);
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
      convertPDFToImages(selectedFile);
    }
  };
  const convertPDFToImages = async (file) => {
    const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
    const pages = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 2.0 });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      await page.render({ canvasContext: context, viewport: viewport }).promise;
      pages.push(canvas.toDataURL());
    }
    setImages(pages);
    if (pages.length === 1) {
      setIsSinglePage(true);
      setDownloadUrl(pages[0]);
    } else {
      setIsSinglePage(false);
      createZipFile(pages);
    }
  };
  const createZipFile = async (images) => {
    const zip = new JSZip();
    images.forEach((img, index) => {
      const imgData = img.replace(/^data:image\/(png|jpg);base64,/, "");
      zip.file(`page-${index + 1}.jpg`, imgData, { base64: true });
    });
    const zipBlob = await zip.generateAsync({ type: "blob" });
    const zipUrl = URL.createObjectURL(zipBlob);
    setDownloadUrl(zipUrl);
  };
  const handleClick = () => {
    document.getElementById("fileInput").click();
  };
  return (
    <div className="pdf-container">
      <Header />
      <div className="container">
        <h1>PDF to JPG</h1>
        <p>Convert PDF pages to JPG images easily.</p>
        <div className="file-upload">
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            accept="application/pdf"
            onChange={handleFileChange}
          />
          <div className="btnwallet">
            <button className="button" onClick={handleClick}>
              <span className="button__text">+ Choose File</span>
              <svg
                class="button__svg"
                role="presentational"
                viewBox="0 0 600 600"
              >
                <defs>
                  <clipPath id="myClip">
                    <rect x="0" y="0" width="100%" height="50%" />
                  </clipPath>
                </defs>
                <g clip-path="url(#myClip)">
                  <g id="money">
                    <path
                      d="M441.9,116.54h-162c-4.66,0-8.49,4.34-8.62,9.83l.85,278.17,178.37,2V126.37C450.38,120.89,446.56,116.52,441.9,116.54Z"
                      fill="#699e64"
                      stroke="#323c44"
                      stroke-miterlimit="10"
                      stroke-width="14"
                    />
                    <path
                      d="M424.73,165.49c-10-2.53-17.38-12-17.68-24H316.44c-.09,11.58-7,21.53-16.62,23.94-3.24.92-5.54,4.29-5.62,8.21V376.54H430.1V173.71C430.15,169.83,427.93,166.43,424.73,165.49Z"
                      fill="#699e64"
                      stroke="#323c44"
                      stroke-miterlimit="10"
                      stroke-width="14"
                    />
                  </g>
                  <g id="creditcard">
                    <path
                      d="M372.12,181.59H210.9c-4.64,0-8.45,4.34-8.58,9.83l.85,278.17,177.49,2V191.42C380.55,185.94,376.75,181.57,372.12,181.59Z"
                      fill="#a76fe2"
                      stroke="#323c44"
                      stroke-miterlimit="10"
                      stroke-width="14"
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
                    stroke-miterlimit="10"
                    stroke-width="14"
                  />
                  <path
                    d="M512.83,382.71H416.71a28.93,28.93,0,0,0-28.95,28.94h0V467.8a29,29,0,0,0,28.95,28.95h96.12a19.31,19.31,0,0,0,19.3-19.3V402a19.3,19.3,0,0,0-19.3-19.3Z"
                    fill="#a4bdc1"
                    stroke="#323c44"
                    stroke-miterlimit="10"
                    stroke-width="14"
                  />
                  <path
                    d="M451.46,435.79v7.88a14.48,14.48,0,1,1-29,0v-7.9a14.48,14.48,0,0,1,29,0Z"
                    fill="#a4bdc1"
                    stroke="#323c44"
                    stroke-miterlimit="10"
                    stroke-width="14"
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
          <p1>
            Max file size 10MB. <a href="/">Sign Up</a> for more
          </p1>
          <p>or drop here</p>
        </div>
        {previewUrl && (
          <div className=".pdf-preview-container">
            <h2>PDF Preview</h2>
            <iframe
              src={previewUrl}
              width="500px"
              height="400px"
              title="PDF Preview"
            ></iframe>
          </div>
        )}
        {images.length > 0 && (
          <div>
            <h2>Converted JPG Images</h2>
            {images.map((img, index) => (
              <div key={index}>
                <img src={img} alt={`Page ${index + 1}`} width="30%" />
              </div>
            ))}
            <br/>
            {downloadUrl && (
              <div>
                {isSinglePage ? (
                  <a href={downloadUrl} download="page-1.jpg">
                    <button className="btn-77">Download JPG</button>
                  </a>
                ) : (
                  <button className="btn-77"
                    onClick={() => saveAs(downloadUrl, "converted-images.zip")}
                  >
                    Download ZIP
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
export default PDFtoJPG;
