import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import "./PDF.css";

function AddPageNumberPreviewPDF() {
  const location = useLocation();
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (location.state && location.state.file) {
      setFile(location.state.file);
      const objectUrl = URL.createObjectURL(location.state.file);
      setPreviewUrl(objectUrl);
    }
  }, [location.state]);

  const handleAddPageNumbers = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);

      setPreviewUrl(url);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="pdf-container">
      <Header />

      <div className="container">
        <p1>Preview</p1>
        {previewUrl && (
          <iframe
            src={previewUrl}
            width="400px"
            height="500px"
            title="Preview"
          ></iframe>
        )}

        <button onClick={handleAddPageNumbers}>Add Page Numbers</button>
      </div>
    </div>
  );
}

export default AddPageNumberPreviewPDF;
