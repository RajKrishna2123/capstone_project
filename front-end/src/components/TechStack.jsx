import docker from '/docker.svg'
import opencv from '/opencv.svg'
import django from '/django.svg'
import mysql from '/sqlite.svg'
import tensorflow from '/tensorflow.svg'
import keras from '/keras.svg'
import react from '/react.svg'
import nvidia from '/nvidia.svg'
import azure from '/azure.svg'
import vite from '/vite.svg'
import '../styling.css'

function TechStack() {
  return (
    <div className="child grid place-content-center">
      {/* <div className='spin-border h-[80vh] w-[80vw] mt-12'> */}
      <div className="h-[80vh] w-[80vw] mt-12">
        <h1 className="text-4xl text-center px-10 py-16 text-white">
          {" "}
          Our{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            {" "}
            Tech Stack{" "}
          </span>
        </h1>
        <div className="tech-stack-grid flex gap-x-32 px-8 gap-y-8 flex-wrap justify-evenly">
          <img
            className="stack-img fade-in-content glow"
            src={opencv}
            title="OpenCV"
          />
          <img
            className="stack-img fade-in-content glow "
            src={docker}
            title="docker"
          />
          <img
            className="stack-img fade-in-content glow "
            src={django}
            title="django"
          />
          <img
            className="stack-img fade-in-content glow "
            src={mysql}
            title="mysql"
          />
          <img
            className="stack-img fade-in-content glow "
            src={tensorflow}
            title="tensorflow"
          />
          <img
            className="stack-img fade-in-content glow "
            src={keras}
            title="keras segmentation"
          />
          <img
            className="stack-img fade-in-content glow "
            src={react}
            title="react"
          />
          <img
            className="stack-img fade-in-content glow "
            src={vite}
            title="vite"
          />
          <img
            className="stack-img fade-in-content glow "
            src={nvidia}
            title="nvidia cuda"
          />
          <img
            className="stack-img fade-in-content glow "
            src={azure}
            title="azure"
          />
        </div>
      </div>
    </div>
  );
}

export default TechStack
