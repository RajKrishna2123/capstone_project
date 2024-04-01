import React from 'react'
import Vid from '/blackhole.webm'
import SplashAnim from './SplashAnim'
function Blackhole() {
    return (
        //   <div className='relative h-[65vh] items-center overflow-hidden z-[-50]'>
        //       <video className='rotate-180 bg-vid translate-y-[-45px] md:translate-y-[-360px]' src={Blackhole}
        //           autoPlay loop muted />
        //   </div>
        <div>
            <div className='relative flex flex-col h-[100vh]'>
                <video className='rotate-180 absolute top-[-320px]  h-full w-full left-0 z-[-2] object-cover' src={Vid}
                    autoPlay loop muted />
                <SplashAnim/>
                {/* <div className='flex my-16 z-10 justify-center'>
                    <a href='/home'>
                        <label className=' text-3xl m-auto  px-16
           py-2 spin-border-button rounded-full cursor-pointer z-[100]'>Get Started</label>
                    </a>
                </div> */}
            </div>
            
        </div>
    )
}

export default Blackhole
