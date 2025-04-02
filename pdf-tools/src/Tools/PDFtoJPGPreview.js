import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import { pdfjs } from 'react-pdf';
import { saveAs } from 'file-saver';
import "./PDF.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function PDFtoJPGPreview() {
  const location = useLocation();
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pdfData, setPdfData] = useState(null);

  useEffect(() => {
    if (location.state && location.state.file) {
      setFile(location.state.file);
      const objectUrl = URL.createObjectURL(location.state.file);
      setPreviewUrl(objectUrl);

      const reader = new FileReader();
      reader.readAsArrayBuffer(location.state.file);
      reader.onload = async () => {
        const pdfData = reader.result;
        setPdfData(pdfData);
        const pdfDoc = await pdfjs.getDocument(pdfData).promise;
        setNumPages(pdfDoc.numPages);
      };
    }
  }, [location.state]);

  const handleConvertAndDownload = async () => {
    const pdfDoc = await pdfjs.getDocument(pdfData).promise;
    for (let i = 1; i <= numPages; i++) {
      const page = await pdfDoc.getPage(i);
      const viewport = page.getViewport({ scale: 2.0 });

      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const context = canvas.getContext('2d');

      await page.render({ canvasContext: context, viewport: viewport }).promise;

      canvas.toBlob((blob) => {
        saveAs(blob, `page_${i}.jpg`);
      }, 'image/jpeg');
    }
  };

  return (
    <div className="pdf-container">
      <Header />
      <div className="container">
        <h1>PDF Preview</h1>
        {previewUrl && (
          <iframe
            src={previewUrl}
            width="500px"
            height="300px"
            title="PDF Preview"
          ></iframe>
        )}<br/>
        <button className="btn-77" onClick={handleConvertAndDownload} disabled={!pdfData}>
          Convert to JPG and Download
        </button>
      </div>
    </div>
  );
}

export default PDFtoJPGPreview;
