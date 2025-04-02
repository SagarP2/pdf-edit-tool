# PDF Edit Tool

The PDF Edit Tool is a web-based application designed for efficient editing, annotation, and management of PDF documents. Built with React.js, Node.js, and PDF.js, it offers a seamless user interface for modifying PDFs, adding annotations, and exporting edited files.

## Features

- **Edit PDFs**: Modify text, images, and layout within PDF files.
- **Annotate PDFs**: Add highlights, comments, and shapes for enhanced collaboration.
- **Merge & Split PDFs**: Combine multiple PDFs or extract specific pages as needed.
- **Export & Download**: Save and export edited PDFs in various formats.
- **User Authentication**: Secure login system with role-based access.
- **Responsive UI**: Modern and intuitive design for optimal user experience.

## Installation Guide

### Prerequisites

Ensure you have the following installed:

- Node.js (>= v14)
- MongoDB (or any preferred database)
- Git

### Backend Setup

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/SagarP2/pdf-edit-tool.git
   ```

2. **Navigate to the Backend Directory**:

   ```bash
   cd pdf-edit-tool/backend
   ```

3. **Install Dependencies**:

   ```bash
   npm install
   ```

4. **Configure Environment Variables**:

   Create a `.env` file in the `backend` directory with the following content:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

5. **Start the Backend Server**:

   ```bash
   npm start
   ```

### Frontend Setup

1. **Navigate to the Frontend Directory**:

   ```bash
   cd ../pdf-tools
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Configure Environment Variables**:

   Create a `.env` file in the `pdf-tools` directory with the following content:

   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

4. **Start the Frontend Server**:

   ```bash
   npm start
   ```

The application should now be running at `http://localhost:3000`.

## Usage

1. **Register an Account**: Sign up using your email and password.
2. **Log In**: Access your account with the registered credentials.
3. **Upload a PDF**: Choose a PDF file from your device to edit.
4. **Edit and Annotate**: Use the provided tools to modify text, add comments, highlight sections, and more.
5. **Merge or Split PDFs**: Combine multiple PDFs into one or extract specific pages as needed.
6. **Export and Download**: Save your edited PDF to your device in the desired format.

## Contributing

Contributions are welcome! To contribute:

1. **Fork the Repository**: Click on the 'Fork' button at the top right of the repository page.
2. **Clone Your Fork**:

   ```bash
   git clone https://github.com/your-username/pdf-edit-tool.git
   ```

3. **Create a New Branch**:

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make Your Changes**: Implement your feature or fix.
5. **Commit Your Changes**:

   ```bash
   git commit -m "Add your commit message here"
   ```

6. **Push to Your Fork**:

   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**: Navigate to the original repository and click on 'New Pull Request'.

## License

This project is licensed under the MIT License.

## Acknowledgments

Special thanks to the contributors and the open-source community for their invaluable support.
