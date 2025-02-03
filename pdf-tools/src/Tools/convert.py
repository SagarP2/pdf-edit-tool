from flask import Flask, request, send_file
from pdf2docx import Converter
import os

app = Flask(__name__)

@app.route('/convert', methods=['POST'])
def convert_pdf_to_word():
    if 'file' not in request.files:
        return {"error": "No file part"}, 400
    
    file = request.files['file']
    
    if file.filename == '':
        return {"error": "No selected file"}, 400
    
    if file and file.filename.endswith('.pdf'):
        pdf_path = f"uploads/{file.filename}"
        word_path = f"converted/{os.path.splitext(file.filename)[0]}.docx"
        
        # Save the PDF file
        file.save(pdf_path)
        
        # Convert PDF to Word
        cv = Converter(pdf_path)
        cv.convert(word_path, start=0, end=None)
        cv.close()
        
        # Send the Word file back
        return send_file(word_path, as_attachment=True)
    else:
        return {"error": "File is not a PDF"}, 400

if __name__ == '__main__':
    os.makedirs('uploads', exist_ok=True)
    os.makedirs('converted', exist_ok=True)
    app.run(debug=True)
