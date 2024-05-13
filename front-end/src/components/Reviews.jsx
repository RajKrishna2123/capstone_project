import '../styling.css'
import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import Slider from 'react-slick';
import  "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const reviewData = [{ name: "Charlie Brown", rev:"This OCR data extraction tool is a game-changer. It's incredibly accurate and saves me hours of manual data entry. Highly recommended!"},
  { name: "John Doe", rev:"I'm impressed with the precision of this OCR tool. It's able to extract data from even the most complex documents. The user interface is also very intuitive and easy to use."},
  { name: "Jane Smith", rev:"I've tried several OCR tools, and this one is by far the best. The accuracy is unparalleled, and it's incredibly fast too. It's made my work so much easier."},
  { name: "Alice Johnson", rev:"This OCR tool is fantastic. It's not only accurate but also very efficient. It's saved me so much time and effort. I can't recommend it enough."},
  { name: "Bob Williams:", rev:"The accuracy of this OCR tool is amazing. It's able to extract data from various types of documents with ease. It's a must-have tool for anyone dealing with a lot of paperwork."},
  { name: "Emma Watson", rev: "This OCR tool is a lifesaver! It's incredibly precise and has saved me countless hours of manual data entry. I can't imagine my work without it." },
  { name: "Robert Downey Jr.", rev: "The accuracy of this OCR tool is simply astounding. It can extract data from even the most complex documents. The user interface is also very user-friendly." },
  { name: "Chris Evans", rev: "I've tried many OCR tools, but this one stands out. The accuracy is unmatched, and it's incredibly fast. It has made my work much more efficient." },
  { name: "Scarlett Johansson", rev: "This OCR tool is excellent. It's not only accurate but also very efficient. It has saved me a lot of time and effort. I highly recommend it." },
  { name: "Tom Holland", rev: "The precision of this OCR tool is amazing. It can extract data from various types of documents with ease. It's an essential tool for anyone dealing with a lot of paperwork." }
];

function Reviews() {
  const sliderSettings = {
    dots: true,
    centerMode: true,
    swipeToSlide: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
        },
      }
    ],
  }; 
  
  const slider = useRef(null);
  
  return (
    <div className="child flex justify-center items-center">
      <div className="w-full fade-in-content h-[80vh]">
        <div className=" relative rounded-[2rem] h-full -z-20">
          <h1 className="text-4xl text-white text-center px-10 md:pt-8">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              {" "}
              Reviews{" "}
            </span>
          </h1>
          <Slider ref={slider} {...sliderSettings} className=" z-1">
            {reviewData.map((d) => (
              <div className=" h-[600px] rounded-lg ">
                <div className="h-[480px] md:mt-20 mt-10 mx-25 spin-border">
                  <div className="flex flex-col justify-center items-center">
                    <p className="text-3xl my-10 font-bold">{d.name}</p>
                    <p className="text-xl px-8 py-16 w-[90%] border-t-2 border-white">
                      {d.rev}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
          <div className="w-full z-1 flex justify-between items-center translate-y-[-300px] text-4xl text-gray-100">
            <button className="" onClick={() => slider?.current?.slickPrev()}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button className="" onClick={() => slider?.current?.slickNext()}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      </div>
    </div>

    // <div>
    //       <div className='reviews fade-in-content h-[100vh] bg-black'>
    //           <div className='review-cards bg-orange-900'>
    //               <div className=' bg-slate-200 card'>div1</div>
    //               <div className=' bg-slate-200 card'>2</div>
    //               <div className=' bg-slate-200 card'>3</div>
    //               <div className=' bg-slate-200 card'>4</div>
    //           </div>
    //           <div className="controls bg-yellow-100">
    //               <button className="prev-btn"> <FontAwesomeIcon icon={faChevronLeft} /></button>
    //               <button className="next-btn"><FontAwesomeIcon icon={faChevronRight} /></button>
    //           </div>

    //       </div>
    // </div>
  );
}

export default Reviews
