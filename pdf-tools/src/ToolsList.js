// src/ToolsList.js
import React from "react";
import Tool from './Tool'; 
import toolsData from './toolsData';
import { useNavigate } from "react-router-dom";

function ToolsList () {
  const navigate = useNavigate();

  const handleToolClick = (toolPath) => {
    navigate.push(toolPath);
  };

  return (
    <div className="tools-list">
      {toolsData.map((tool, index) => (
        <div
          key={index}
          onClick={() => handleToolClick(tool.path)}
        >
          <Tool
            icon={tool.icon}
            title={tool.title}
            description={tool.description}
          />
        </div>
      ))}
    </div>
  );
}

export default ToolsList;
