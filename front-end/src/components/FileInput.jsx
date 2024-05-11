import React, { useState } from "react";
import parse from "html-react-parser";

function FileInput() {
  const [fileContent, setFileContent] = useState("");

  const handleFileRead = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => setFileContent(e.target.result);
    reader.readAsText(file);
  };

  return (
    // <div className="text-white">
    //   <input type="file" onChange={handleFileRead} />
    //   {parse(fileContent)}
    // </div>
    <></>
  );
}

export default FileInput;
