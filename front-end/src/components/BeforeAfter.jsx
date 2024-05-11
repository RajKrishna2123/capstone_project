import React, { useRef, useEffect } from "react";
import "../styling.css";

function BeforeAfter() {
  const resizableRef = useRef(null);
  const resizerRef = useRef(null);

  useEffect(() => {
    const resizableElement = resizableRef.current;
    const resizerElement = resizerRef.current;

    const mouseDownHandler = function (e) {
      e.preventDefault();

      let startX = e.pageX || e.touches[0].pageX; // Added touch event
      let startWidth = parseInt(
        document.defaultView.getComputedStyle(resizableElement).width,
        10
      );

      const mouseMoveHandler = function (e) {
        const maxWidth = 800; // Set your maximum width here
        let pageX = e.pageX || e.touches[0].pageX; // Added touch event
        let newWidth = startWidth + pageX - startX;

        if (newWidth > maxWidth) {
          newWidth = maxWidth;
        }
        resizableElement.style.width = `${newWidth}px`;
      };

      const mouseUpHandler = function () {
        document.removeEventListener("mousemove", mouseMoveHandler);
        document.removeEventListener("mouseup", mouseUpHandler);
        document.removeEventListener("touchmove", mouseMoveHandler); // Added touch event
        document.removeEventListener("touchend", mouseUpHandler); // Added touch event
      };

      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
      document.addEventListener("touchmove", mouseMoveHandler); // Added touch event
      document.addEventListener("touchend", mouseUpHandler); // Added touch event
    };

    resizerElement.addEventListener("mousedown", mouseDownHandler);
    resizerElement.addEventListener("touchstart", mouseDownHandler); // Added touch event

    return () => {
      resizerElement.removeEventListener("mousedown", mouseDownHandler);
    };
  }, []);

  return (
    <div className=" h-[450px] w-[800px] spin-border flex items-center justify-center">
      <div className="overflow-hidden spin-border">
        <div className="h-[450px] w-[800px] bg-red-500 ">
          <div
            className="w-[50%] h-full bg-blue-500 resizable"
            ref={resizableRef}
          >
            <div
              className="h-full w-[20px] resizer resizer-right"
              ref={resizerRef}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BeforeAfter;
