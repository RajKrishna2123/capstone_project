import React from 'react'
import '../styling.css'
import logo from '/logo.svg'
import gift from '/gift.svg'
import logout from '/log-out.svg'




function Navbar() {
	return (
		// <div>
		// 	<div className="flex items-center justify-between px-4 fixed top-0 z-50 w-full
      	// 		 gap-8 text-lg text-white shadow-lg shadow-[#2A0E61]/50
		// 		 bg-[#03001417] backdrop-blur-md">
		// 		<a href="/" title="Homepage" className='flex items-center gap-1'>
		// 			<img src={logo} className=' h-[64px]' />
		// 			<h1 className=' font-cursive rotate-[-20deg]'>QuickOCR</h1>
		// 		</a>
		// 		<ul className='flex gap-20 justify-around'>
		// 			<li>
		// 				<a href='/about' className='header-button'>About</a>
		// 			</li>
		// 			<li>
		// 				<a href='/services' className='header-button'>Services</a>
		// 			</li>
		// 			<li>
		// 				<a href='/pricing' className='header-button'>Pricing</a>
		// 			</li>
		// 		</ul>
		// 		<a href="/" title="Login/signup">
		// 			<img src={logout} className='header-button max-h-[24px] ' />
		// 		</a>
		// 	</div>
		// </div>





		<div className=" w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-sm z-50 px-10">
			<div className="w-full h-full flex flex-row items-center justify-between m-auto px-[10px]">
				<a
					href="/"
					className="h-auto w-auto flex flex-row items-center"
				>
					<img src={logo} className=' h-[40px]' />

					<span className="font-bold ml-[10px] hidden md:block text-gray-300">
						QuickOCR
					</span>
				</a>

				<div className="w-[500px] h-full flex flex-row items-center justify-between md:mr-20">
					<div className="hidden md:flex flex-col md:flex-row items-center justify-between w-full h-auto border
           border-[#7042f861] bg-[#0300145e] mr-[15px] px-[20px] py-[10px] rounded-full
            text-gray-200">
						<a href="/about" className="cursor-pointer">
							Documentation
						</a>
						<a href="/" className="cursor-pointer">
							Pricing
						</a>
						<a href="/" className="cursor-pointer">
							Services
						</a>
						
						
					</div>
				</div>

				<div className="flex flex-row gap-5">
					<a href="/" title="Rewards">
						<img src={gift} className='header-button max-h-[24px] ' />
					</a>
					<a href="/" title="Login/signup">
					 	<img src={logout} className='header-button max-h-[24px] ' />
					</a>
				</div>
			</div>
		</div>
	)
}

export default Navbar
