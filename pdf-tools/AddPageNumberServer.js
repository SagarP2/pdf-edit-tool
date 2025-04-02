const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { PDFDocument, rgb } = require('pdf-lib');

const app = express();
const PORT = process.env.PORT || 3001;

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage });

// Serve static files (e.g., for PDF downloads)
app.use(express.static('public'));

// Endpoint to handle file upload
app.post('/api/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }
  res.json({ filename: file.originalname, path: file.path });
});

// Endpoint to add page number to uploaded PDF file
app.post('/api/addpagenumber', async (req, res) => {
  const { path: filePath, filename } = req.body;
  const pageNumber = parseInt(req.body.pageNumber);

  try {
    const pdfBuffer = fs.readFileSync(filePath);
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    const pages = pdfDoc.getPages();

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const { width, height } = page.getSize();
      const text = `${pageNumber + i}`; // Adjust as needed for formatting
      const helveticaFont = await pdfDoc.embedFont(PDFDocument.Font.Helvetica);
      page.drawText(text, {
        x: width / 2,
        y: height / 2,
        size: 50,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    }

    const modifiedFilePath = path.join(__dirname, `modified-${filename}`);
    const modifiedPdfBytes = await pdfDoc.save();
    fs.writeFileSync(modifiedFilePath, modifiedPdfBytes);

    res.json({ originalName: filename, path: modifiedFilePath });
  } catch (error) {
    console.error('Error adding page numbers:', error);
    res.status(500).send('Error adding page numbers');
  }
});

// Endpoint to download modified PDF file
app.get('/api/download', (req, res) => {
  const filePath = req.query.path;
  res.download(filePath);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
