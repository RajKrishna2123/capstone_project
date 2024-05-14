import '../styling.css'

export default function Footer() {
  return (
    <div
      className="shadow-[0_-10px_15px_-3px_rgba(255,255,255)] w-full mt-4 pt-4
       text-white md:h-[200px] h-[480px] shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-sm z-[-1]"
    >
      <div
        className="w-full flex flex-col justify-end px-10 
          shadow-[#2A0E61]/50 bg-[#03001417]  backdrop-blur-sm"
      >
        <div className="flex flex-col items-center justify-end z-[1] ">
          <div className="w-full h-full flex items-center justify-around flex-wrap">
            <div className="min-w-[200px] h-auto flex flex-col items-center justify-start">
              <div className="font-bold text-[16px]">Community</div>
              <p className="flex flex-row items-center my-2 cursor-pointer">
                <span className="text-[15px] ml-[6px]">Youtube</span>
              </p>
              <p className="flex flex-row items-center my-2 cursor-pointer">
                <a href="https://github.com/RajKrishna2123/capstone_project">
                  <span className="text-[15px] ml-[6px]">Github</span>
                </a>
              </p>
              <p className="flex flex-row items-center my-2 cursor-pointer">
                <span className="text-[15px] ml-[6px]">Discord</span>
              </p>
            </div>
            <div className="min-w-[200px] h-auto flex flex-col items-center justify-start">
              <div className="font-bold text-[16px]">Social Media</div>
              <p className="flex flex-row items-center my-2 cursor-pointer">
                <span className="text-[15px] ml-[6px]">Instagram</span>
              </p>
              <p className="flex flex-row items-center my-2 cursor-pointer">
                <span className="text-[15px] ml-[6px]">Twitter</span>
              </p>
              <p className="flex flex-row items-center my-2 cursor-pointer">
                <span className="text-[15px] ml-[6px]">Linkedin</span>
              </p>
            </div>
            <div className="min-w-[200px] h-auto flex flex-col items-center justify-start">
              <div className="font-bold text-[16px]">About</div>
              <p className="flex flex-row items-center my-2 cursor-pointer">
                <span className="text-[15px] ml-[6px]">Become Sponsor</span>
              </p>
              <p className="flex flex-row items-center my-2 cursor-pointer">
                <span className="text-[15px] ml-[6px] cursor-pointer z-50">
                  <a href="/about">Learning about us</a>
                </span>
              </p>
              <p className="flex flex-row items-center my-2 cursor-pointer">
                <span className="text-[15px] ml-[6px]">
                  QuickOCR@example.com{" "}
                </span>
              </p>
            </div>
          </div>

          <div className="mb-[20px] text-[15px] text-center">
            {/* &copy; WebChain Dev 2023 Inc. All rights reserved */}
          </div>
        </div>
      </div>
    </div>
  );
}