import JoditEditor from "jodit-react";
import React, { useState, useEffect, useRef } from "react";
import '../styling.css';
import parse from "html-react-parser";


const DisplayEditor = ({ fileContent }) => {
  const editor = useRef(null);
  const [content, setContent] = useState(fileContent);

  if (fileContent !== "") {
    return (
      <div className="flex flex-col items-center gap-10">
        <JoditEditor
          ref={editor}
          value={content}
          config={{ height: 512, width: 1200 }}
          onChange={(newContent) =>
            setContent(
              newContent
                .replace(/<h2>/g, "<h2 className='doc-h2 '>")
                .replace(/<h3>/g, "<h3 className='doc-h3'>")
                .replace(/<p>/g, "<p className='para'>")
                .replace(/<ul>/g, "<ul className='list-disc para'>")
            )
          }
        />
        <button
          className="text-white text-3xl m-auto px-16
           py-2 spin-border-button rounded-full cursor-pointer"
          onClick={() => {
            console.log(content);
          }}
        >
          Commit changes
        </button>
        <div className="docs-container pt-10">
          <main className="backdrop-blur-lg">{parse(content)}</main>
        </div>
      </div>
    );
  }
};

const TextEditor = ({fileContent}) => {
    if (fileContent != "") {
        return (
          <div className="">
            
            <DisplayEditor fileContent={fileContent} />
            
          </div>
        );
    }
}

export default TextEditor;
