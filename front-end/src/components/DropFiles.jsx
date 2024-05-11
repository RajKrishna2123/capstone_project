import "../styling.css";
import React from "react";
import Dropzone from "react-dropzone";
import $ from "jquery";

function DropFiles() {



  return (
    <div className="w-full h-[80vh] text-white mt-20 flex justify-center backdrop-blur-sm px-8">
      <Dropzone
        onDrop={(acceptedFiles) => {
          acceptedFiles.forEach((file) => {
            var form = new FormData();
            form.append("file", file);

            var settings = {
              url: "http://localhost:8000/predict",
              method: "POST",
              timeout: 0,
              processData: false,
              mimeType: "multipart/form-data",
              contentType: false,
              data: form,
            };

            $.ajax(settings).done(function (response) {
              console.log(response);
            });
          });
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <section className="w-full">
            <div
              {...getRootProps()}
              className="dropzone h-[80%] w-full border-4 border-gray-400
                        border-dashed rounded-3xl"
            >
              <input {...getInputProps()} />
              <p className="py-16 text-center text-xl">
                Drag 'n' drop some files here, or click to select files
              </p>
              <div className="flex justify-around text-center">
                <div className="w-80 flex flex-col gap-4 items-center">
                  <div className="w-40 h-40 rounded-[100%] spin-border  flex items-center justify-center">
                    <p className="text-4xl glow">Step</p>

                    <span className="glow text-transparent text-9xl bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                      1
                    </span>
                  </div>
                  <p className="text-2xl">
                    Click{" "}
                    <span className="glow text-transparent text-3xl bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                      Upload
                    </span>{" "}
                    to upload your images
                  </p>
                </div>
                <div className="w-80 flex flex-col gap-4 items-center">
                  <div className="w-40 h-40 rounded-[100%] spin-border  flex items-center justify-center">
                    <p className="text-4xl glow">Step</p>

                    <span className="glow text-transparent text-9xl bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                      2
                    </span>
                  </div>
                  <p className="text-2xl">
                    Click{" "}
                    <span className="glow text-transparent text-3xl bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                      Convert
                    </span>{" "}
                    then sit back, relax and wait for the magic to happen
                  </p>
                </div>
                <div className="w-80 flex flex-col gap-4 items-center">
                  <div className="w-40 h-40 rounded-[100%] spin-border  flex items-center justify-center">
                    <p className="text-4xl glow">Step</p>

                    <span className="glow text-transparent text-9xl bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                      3
                    </span>
                  </div>
                  <p className="text-2xl">
                    Click{" "}
                    <span className="glow text-transparent text-3xl bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                      Download
                    </span>{" "}
                    to download all of your converted files
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
}

export default DropFiles;
