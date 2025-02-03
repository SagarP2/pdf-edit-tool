import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Header from "../components/Header";
import "./PDF.css";
const ItemTypes = {
  TEXT: 'text',
  SHAPE: 'shape',
  COMMENT: 'comment',
  HIGHLIGHT: 'highlight'
};
const Tool = ({ type, children }) => {
  const [, drag] = useDrag(() => ({
    type,
    item: { type }
  }));
  return (
    <div ref={drag} className="tool-item">
      {children}
    </div>
  );
};
const EditableText = ({ text, left, top, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentText, setCurrentText] = useState(text);
  const handleDoubleClick = () => {
    setIsEditing(true);
  };
  const handleBlur = () => {
    setIsEditing(false);
    onUpdate(currentText);
  };
  const handleChange = (e) => {
    setCurrentText(e.target.value);
  };
  return (
    <div
      style={{ position: 'absolute', left, top }}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing ? (
        <input
          type="text"
          value={currentText}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <span>{currentText}</span>
      )}
    </div>
  );
};
const DropZone = ({ fileURL }) => {
  const [items, setItems] = useState([]);
  const [, drop] = useDrop(() => ({
    accept: [ItemTypes.TEXT, ItemTypes.SHAPE, ItemTypes.COMMENT, ItemTypes.HIGHLIGHT],
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      setItems(items => [
        ...items, 
        { ...item, left: offset.x - 50, top: offset.y - 25, text: 'Edit me' }
      ]);
    }
  }));
  const updateItemText = (index, newText) => {
    setItems(items => {
      const newItems = [...items];
      newItems[index].text = newText;
      return newItems;
    });
  };
  return (
    <div ref={drop} className="pdf-preview-container">
      <iframe
        src={fileURL}
        title="PDF Preview"
        width="100%"
        height="600px"
        style={{ border: "none" }}
      ></iframe>
      {items.map((item, index) => (
        <div
          key={index}
          className={`drag-item ${item.type}`}
          style={{ position: "absolute", left: item.left, top: item.top }}
        >
          {item.type === ItemTypes.TEXT && (
            <EditableText 
              text={item.text}
              left={item.left}
              top={item.top}
              onUpdate={(newText) => updateItemText(index, newText)}
            />
          )}
          {item.type === ItemTypes.SHAPE && "Shape"}
          {item.type === ItemTypes.COMMENT && "Comment"}
          {item.type === ItemTypes.HIGHLIGHT && "Highlight"}
        </div>
      ))}
    </div>
  );
};
function PDFEditor() {
  const [fileURL, setFileURL] = useState(null);
  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setFileURL(fileURL);
    }
  };
  return (
    <div className="pdf-container">
      <Header />
      <div className="container">
        <h1>PDF Editor</h1>
        <p>
          Edit PDF by adding text, shapes, comments and highlights. Your <br />
          secure and simple tool to edit PDF.{" "}
        </p>
        <div className="file-upload">
          <input 
            type="file" 
            id="fileInput" 
            style={{ display: "none" }} 
            accept="application/pdf"
            onChange={onFileChange}
          />
          <div className="btnwallet">
            <button 
              className="button"
              onClick={() => document.getElementById('fileInput').click()}
            >
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
            Max file size 1MB. <a href="/">Sign Up</a> for more
          </p1>
          <p>or drop here</p>
        </div>
        
        {fileURL && (
          <DndProvider backend={HTML5Backend}>
            <div className="toolbox">
              <Tool type={ItemTypes.TEXT}>Add Text</Tool>
              <Tool type={ItemTypes.SHAPE}>Add Shape</Tool>
              <Tool type={ItemTypes.COMMENT}>Add Comment</Tool>
              <Tool type={ItemTypes.HIGHLIGHT}>Add Highlight</Tool>
            </div>
            <DropZone fileURL={fileURL} />
          </DndProvider>
        )}
      </div>
    </div>
  );
}
export default PDFEditor;