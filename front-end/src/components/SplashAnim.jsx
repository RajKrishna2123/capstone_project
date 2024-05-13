import React, {useEffect, useState} from "react";
import { motion } from "framer-motion";
import {
    slideInFromLeft,
    slideInFromRight,
    slideInFromTop,
    slideInFromBottom
} from "./utils/motion";
import stack from '../../public/icons_only.png'
import {QRCodeCanvas} from 'qrcode.react';

const QRCodeComponent = () => {
  const [link, setLink] = useState('');

  useEffect(() => {
    setLink(window.location.href);
    console.log('link is ' +window.location.href);
  }, []);

  return (
    <div>
      <QRCodeCanvas value={link} size={256} includeMargin={true}/>
    </div>
  );
};


const SplashAnim = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        className="flex items-center justify-center px-20 mt-20 md:mt-0 w-full z-[50]"
      >
        <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
          <motion.div
            variants={slideInFromTop}
            className="Welcome-box py-[8px] px-[7px]  border-[#7042f88b] opacity-[0.9]"
          ></motion.div>

          <motion.div
            variants={slideInFromLeft(0.5)}
            className="flex flex-col gap-6 mt-16 md:mt-52 md:text-5xl text-3xl font-bold text-white max-w-[600px] w-auto h-auto"
          >
            <span>
              Providing
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                {" "}
                the fastest OCR{" "}
              </span>
              conversion exprience
            </span>
          </motion.div>

          <motion.p
            variants={slideInFromLeft(0.8)}
            className="text-lg text-gray-400 my-5 md:w-[550px] w-[16rem]"
          >
            Innovations in Document Analysis: Exploring Keras Segmentation
            <br /> and Graph Convolutional Neural Networks for Structural OCR
          </motion.p>
          <motion.div variants={slideInFromBottom(1.5)}>
            <a href="/home">
              <label
                className="text-3xl m-auto md:px-16 px-8
           py-2 spin-border-button rounded-full cursor-pointer"
              >
                Get Started
              </label>
            </a>
          </motion.div>
        </div>

        <motion.div
          variants={slideInFromRight(0.8)}
          className="w-full h-full flex justify-center items-center relative top-32 -right-28"
        >
          {isMobile ? (
            <div></div>
          ) : (
            <div className="flex flex-col items-center text-lg text-gray-400">
              <QRCodeComponent />
              <br />
              <p>
                Scan the QR code to open the website in your own hand-held
                devices!
              </p>
            </div>
          )}
          {/* <img src={stack} className=" opacity-30 invert scale-90" height={450} width={450}/> */}
        </motion.div>
      </motion.div>
    );
};

export default SplashAnim;