import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import "./styling.css";
import TextEditor from "./components/TextEditor";


function DocumentationEditor() {

  const [fileContent, setFileContent] = useState("");

  const handleFileRead = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => setFileContent(e.target.result);
    reader.readAsText(file);
  };

  return (
    <div>
      <Navbar />
      <h1
        className="text-4xl font-extrabold text-center text-white mt-20"
        id="initial-header"
      >
        Documentation Editor
      </h1>
      <input type="file" onChange={handleFileRead} />
      <TextEditor fileContent={fileContent} />

    </div>
  );
}

export default DocumentationEditor;
