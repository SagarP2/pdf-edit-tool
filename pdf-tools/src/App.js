import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Tool from "./components/Tool";
import TrustSection from "./components/TrustSection";
import Component1 from "./Home/Component1";
import Footer from "./components/Footer";
import toolsData from "./toolsData";

// Import your tool pages here
import MergePDF from "./Tools/MergePDF";
import SplitPDF from "./Tools/SplitPDF";
import CompressPDF from "./Tools/CompressPDF";
import RotatePDF from "./Tools/RotatePDF";
import PDFtoWORD from "./Tools/PDFtoWORD";
import PDFtoEXCEL from "./Tools/PDFtoEXCEL";
import PDFtoPOWERPOINT from "./Tools/PDFtoPOWERPOINT";
import WORDtoPDF from "./Tools/WORDtoPDF";
import POWERPOINTtoPDF from "./Tools/POWERPOINTtoPDF";
import EXCELtoPDF from "./Tools/EXCELtoPDF";
import PDFtoJPG from "./Tools/PDFtoJPG";
import PDFEditor from "./Tools/PDFEditor";
import JPGtoPDF from "./Tools/JPGtoPDF";
import SignPDF from "./Tools/SignPDF";
import AddwatermarkintoaPDF from "./Tools/AddwatermarkintoaPDF";
import HTMLtoPDF from "./Tools/HTMLtoPDF";
import UnlockPDF from "./Tools/UnlockPDF";
import OrganizePDF from "./Tools/OrganizePDF";
import PDFtoPDFA from "./Tools/PDFtoPDFA";
import RepairPDFfile from "./Tools/RepairPDFfile";
import AddPDFpagenumbers from "./Tools/AddPDFpagenumbers";
import AddPageNumberPreviewPDF from "./Tools/AddPageNumberPreviewPDF";
import ScantoPDF from "./Tools/ScantoPDF";
import OCRPDF from "./Tools/OCRPDF";

import ProtectPDF from "./Tools/ProtectPDFfile";
import PDFtoJPGPreview from "./Tools/PDFtoJPGPreview";
import ComparePDF from "./Tools/ComparePDF";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />

        <Route path="/MergePDF" element={<MergePDF />} />
        <Route path="/SplitPDF" element={<SplitPDF />} />
        <Route path="/CompressPDF" element={<CompressPDF />} />
        <Route path="/RotatePDF" element={<RotatePDF />} />
        <Route path="/PDFtoWORD" element={<PDFtoWORD />} />
        <Route path="/PDFtoPOWERPOINT" element={<PDFtoPOWERPOINT />} />
        <Route path="/PDFtoEXCEL" element={<PDFtoEXCEL />} />
        <Route path="/WORDtoPDF" element={<WORDtoPDF />} />
        <Route path="/POWERPOINTtoPDF" element={<POWERPOINTtoPDF />} />
        <Route path="/EXCELtoPDF" element={<EXCELtoPDF />} />
        <Route path="/PDFEditor" element={<PDFEditor />} />
        <Route path="/PDFtoJPG" element={<PDFtoJPG />} />
        <Route path="/PDFtoJPGPreview" element={<PDFtoJPGPreview />} />
        <Route path="/JPGtoPDF" element={<JPGtoPDF />} />
        <Route path="/SignPDF" element={<SignPDF />} />
        <Route path="/AddwatermarkintoaPDF" element={<AddwatermarkintoaPDF />} />
        <Route path="/ProtectPDF" element={<ProtectPDF />} />
        <Route path="/HTMLtoPDF" element={<HTMLtoPDF />} />
        <Route path="/UnlockPDF" element={<UnlockPDF />} />
        <Route path="/OrganizePDF" element={<OrganizePDF />} />
        <Route path="/PDFtoPDFA" element={<PDFtoPDFA />} />
        <Route path="/RepairPDFfile" element={<RepairPDFfile />} />
        <Route path="/AddPDFpagenumbers" element={<AddPDFpagenumbers />} />
        <Route path="/ScantoPDF" element={<ScantoPDF />} />
        <Route path="/OCRPDF" element={<OCRPDF />} />
        <Route path="/AddPageNumberPreviewPDF" element={<AddPageNumberPreviewPDF />} />
        <Route path="/ComparePDF" element={<ComparePDF />} />
        <Route path="/Component1" element={<Component1/>} />
      </Routes>
      <Footer />
    </div>
  );
}

const MainPage = () => (
  <>
    <MainContent />
    <div className="tools-container">
      {toolsData.map((tool, index) => (
        <Tool key={index} {...tool} />
      ))}
    </div><br/><br/><br/>
    <TrustSection />
    
  </>
);

export default App;
