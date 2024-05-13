import React from 'react'
import '../styling.css'
import security from '/encryption.webm'

function Security() {
  return (
    <div className="child flex flex-row relative items-center justify-center w-full h-full">
      <div className="absolute w-auto h-auto top-0 z-[5] mt-20">
        <div className="text-[40px] font-medium text-center text-gray-200">
          Performance
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            {" "}
            &{" "}
          </span>
          Security
        </div>
      </div>

      <div className="flex flex-col items-center justify-center translate-y-[60px] absolute z-[20] w-auto h-auto">
        <div className="flex flex-col items-center group cursor-pointer w-auto h-auto">
          <img
            src="../../public/LockTop.png"
            alt="Lock top"
            width={50}
            height={50}
            className="w-[50px] transition-all -translate-y-2 duration-200 group-hover:translate-y-11"
          />
          <img
            src="../../public/LockMain.png"
            alt="Lock Main"
            width={70}
            height={70}
            className="z-10 -translate-y-5"
          />
        </div>
      </div>
      <div className="absolute z-[20] bottom-[40px] px-[5px]">
        <div className="cursive text-[20px] font-medium text-center text-gray-300 -translate-y-28 md:translate-y-0">
          Secure your data with end-to-end encryption
        </div>
      </div>

      <div className="fade-in-content w-full flex items-start justify-center translate-y-[50px] z-[-2] absolute scale-[6] md:scale-100">
        <video
          loop
          muted
          autoPlay
          playsInline
          preload="false"
          className="w-full h-auto"
          src={security}
        />
      </div>
    </div>
  );
}

export default Security
