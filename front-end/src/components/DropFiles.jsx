import "../styling.css";
import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import $ from "jquery";



function sendFile(file, setImageUrls, setCSVUrls) {
  var form = new FormData();
  form.append("file", file);
  var settings = {
    url: "http://192.168.1.9:8000/predict",
    method: "POST",
    timeout: 0,
    processData: false,
    mimeType: "multipart/form-data",
    contentType: false,
    data: form,
    xhrFields: {
      responseType: "blob", // to deal with binary data
    },
  };

  return new Promise((resolve, reject) => {

    $.ajax(settings)
      .done(function (response) {
        var url = window.URL.createObjectURL(response);
        setImageUrls((prevUrls) => [...prevUrls, url]);
        var file2 = new File([response], "mask.png", { type: "image/png" });
        form.append("file2", file2);

        for (let [key, value] of form.entries()) {
          console.log(key, value);
        }
        var settings2 = {
          url: "http://192.168.1.9:7000/predict_csv",
          method: "POST",
          timeout: 0,
          processData: false,
          mimeType: "multipart/form-data",
          contentType: false,
          data: form,
        };
        $.ajax(settings2).done(function (response2) {
          console.log('hi');
          console.log(response2);
          var csvBlob = new Blob([response2], { type: "text/csv" });

          // Create a URL for the CSV Blob
          var csvUrl = URL.createObjectURL(csvBlob);
          setCSVUrls((prevUrls) => [...prevUrls, csvUrl], resolve());
        });
        
      })
      .fail(function (error) {
        reject(error);
      });
  });
}

function downloadCSV(csvUrl) {
  console.log('downloading csv');
  var a = document.createElement("a");

  // Set the href and download attributes of the anchor
  a.href = csvUrl;
  a.download = "file.csv";

  // Append the anchor to the body
  document.body.appendChild(a);

  // Programmatically click the anchor
  a.click();

  // Remove the anchor from the body
  document.body.removeChild(a);
}

const DropzoneComponent = ({ setAreFilesUploaded, setSelectedImages }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Dropzone
      onDrop={(acceptedFiles) => {
        setSelectedImages(acceptedFiles);
        setAreFilesUploaded(true);
      }}
    >
      {({ getRootProps, getInputProps, isDragActive }) => (
        <section className="w-full">
          <div
            {...getRootProps()}
            className="dropzone md:h-[80%] h-[95%] w-full border-4 border-gray-400
                        border-dashed rounded-3xl"
          >
            <input {...getInputProps()} accept="image/jpeg" />
            {isDragActive ? (
              <p className="py-16 text-center text-xl">Drop files here...</p>
            ) : (
              <p className="md:py-16 text-center text-xl">
                {isMobile
                  ? ""
                  : "Drag 'n' drop some files here, or click in the box to upload files"}
              </p>
            )}
            <div className="flex justify-around text-center flex-col md:flex-row mt-4 items-center gap-2">
              <div className="w-80 flex flex-col gap-4 items-center">
                <div className="md:w-40 w-28 md:h-40 h-24 rounded-[100%] spin-border  flex items-center justify-center">
                  <p className="md:text-4xl text-2xl glow">Step</p>

                  <span className="glow text-transparent md:text-9xl text-6xl bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                    1
                  </span>
                </div>
                <p className="text-2xl">
                  {isMobile ? "Tap " : "Click "} in the box to{" "}
                  <span className="glow text-transparent md:text-3xl bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                    upload
                  </span>{" "}
                  your images
                </p>
              </div>
              <div className="w-80 flex flex-col gap-4 items-center">
                <div className="md:w-40 w-28 md:h-40 h-24 rounded-[100%] spin-border  flex items-center justify-center">
                  <p className="md:text-4xl text-2xl glow">Step</p>

                  <span className="glow text-transparent md:text-9xl text-6xl bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                    2
                  </span>
                </div>
                <p className="text-2xl">
                  {isMobile ? "Tap " : "Click "}{" "}
                  <span className="glow text-transparent md:text-3xl bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                    Convert
                  </span>{" "}
                  then sit back, relax and wait for the magic to happen
                </p>
              </div>
              <div className="w-80 flex flex-col gap-4 items-center">
                <div className="md:w-40 w-28 md:h-40 h-24 rounded-[100%] spin-border  flex items-center justify-center">
                  <p className="md:text-4xl text-2xl glow">Step</p>

                  <span className="glow text-transparent md:text-9xl text-6xl bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                    3
                  </span>
                </div>
                <p className="text-2xl">
                  {isMobile ? "Tap " : "Click "}{" "}
                  <span className="glow text-transparent md:text-3xl bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
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
  );
};

const Processing = () => {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots + 1) % 4);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return <div className="">Processing{new Array(dots).fill(".").join("")}</div>;
};

const ImagePreview = ({ selectedImages }) => {
  const [imageUrls, setImageUrls] = useState([]);
  const [CSVUrls, setCSVUrls] = useState([]);
  const [initiated, setInitiated] = useState(false);
  const [downloadReady, setDownloadReady] = useState(false);
  return (
    <div className="flex flex-col gap-16 items-center w-[80vw]">
      <h1 className="text-6xl pt-8 text-center ">Your Images</h1>
      <div
        className="w-full h-auto md:flex md:justify-evenly grid grid-cols-2 gap-2 bg-[#0D0E1D]/50 md:rounded-full
       rounded-xl md:px-20 px-4 md:border-8 border-2 border-[#7042f861] py-6"
      >
        {selectedImages.length > 0 &&
          selectedImages
            .slice(0, 10)
            .map((image, index) => (
              <img
                src={`${URL.createObjectURL(image)}`}
                key={index}
                alt=""
                className="md:w-40 md:h-30 w-20 h-20"
              />
            ))}
      </div>
      {!initiated ? (
        <button
          className="md:text-4xl text-2xl m-auto px-16 py-2 spin-border-button rounded-full cursor-pointer md:w-[30rem]"
          onClick={() => {
            if (selectedImages.length > 10) {
              alert(
                "Only 10 images can be converted at a time. Upgrade to premium for more!"
              );
            }
            setInitiated(true);
            Promise.all(
              selectedImages
                .slice(0, 10)
                .map((image) => sendFile(image, setImageUrls, setCSVUrls))
            ).then(() => setDownloadReady(true));
          }}
        >
          Convert
        </button>
      ) : downloadReady ? (
        <button 
        onClick={() => {console.log('clicked'); ;CSVUrls.forEach((url) => downloadCSV(url));}}
        className="md:text-4xl text-2xl m-auto px-16 py-2 spin-border-button rounded-full cursor-pointer md:w-[30rem]">
          Download!
        </button>
      ) : (
        <button className="md:text-4xl text-2xl m-auto px-16 py-2 spin-border-button rounded-full cursor-pointer md:w-[30rem]">
          <Processing />
        </button>
      )}
      <div
        className="w-full h-auto md:flex md:justify-evenly grid grid-cols-2 gap-2 bg-[#0D0E1D]/50 md:rounded-full
       rounded-xl md:px-20 px-4 md:border-8 border-2 border-[#7042f861] py-6"
      >
        {imageUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Preview ${index}`}
            className="md:w-40 md:h-30 w-20 h-20"
          />
        ))}
      </div>
    </div>
  );
};

function DropFiles() {
  const [areFilesUploaded, setAreFilesUploaded] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  return (
    <div
      className="w-[full] h-[80vh] text-white mt-20 flex 
    justify-center backdrop-blur-sm font-lato"
    >
      {areFilesUploaded ? (
        <ImagePreview selectedImages={selectedImages} />
      ) : (
        <DropzoneComponent
          setAreFilesUploaded={setAreFilesUploaded}
          setSelectedImages={setSelectedImages}
        />
      )}
    </div>
  );
}

export default DropFiles;
