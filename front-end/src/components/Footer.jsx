import '../styling.css'

export default function Footer() {
  return (
      <div className='shadow-[0_-10px_15px_-3px_rgba(255,255,255)] absolute translate-y-[-140px] w-full
       text-white h-[350px] shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-sm z-[-1]'>
          <div className="w-full h-full flex flex-col justify-end mt-20 px-10 
          shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-sm ">
              <div className="flex flex-col items-center justify-end z-[1]">
                  <div className="w-full h-full flex items-center justify-around flex-wrap">


                      <div className="min-w-[200px] h-auto flex flex-col items-center justify-start">
                          <div className="font-bold text-[16px]">Community</div>
                          <p className="flex flex-row items-center my-2 cursor-pointer">
                              <span className="text-[15px] ml-[6px]">Youtube</span>
                          </p>
                          <p className="flex flex-row items-center my-2 cursor-pointer">
                              <span className="text-[15px] ml-[6px]">Github</span>
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

                              <span className="text-[15px] ml-[6px]">Learning about me</span>
                          </p>
                          <p className="flex flex-row items-center my-2 cursor-pointer">

                              <span className="text-[15px] ml-[6px]">mifwebchain@gmail.com</span>
                          </p>
                      </div>
                  </div>

                  <div className="mb-[20px] text-[15px] text-center">
                      &copy; WebChain Dev 2023 Inc. All rights reserved
                  </div>
              </div>
          </div>
      </div>
  )
}
