import React from 'react'
import '../styling.css'


function Authors() {
  return (
      <div className='page-container select-none'>
      <div className='flex flex-col justify-center items-center font-abril text-center m-16'>
        <div className=' text-5xl font-bold'>Team Overview and Contributors</div>
        <div className='flex justify-evenly w-[80%] h-[69vh]'>
            <div className='flex flex-col items-center m-8'>
                <div className='text-3xl font-bold'>Raj Krishna</div>
                <div className='spin-border-img m-2'>
              <img className='rounded-full'
                src='https://www.w3schools.com/howto/img_avatar.png' />
                </div>
                <div className='text-lg font-bold'>Backend architect and Ai development / integration</div>
            </div>
            <div className='flex flex-col items-center m-8'>
                <div className='text-3xl font-bold'>Vaibhav Joshi</div>
            <div className='spin-border-img m-2'>
              <img className='author-img rounded-full'
                src='https://www.w3schools.com/howto/img_avatar.png' />
            </div>
                      <div className='text-lg font-bold'>AI developmet with research and design strateg</div>
            </div>
            <div className='flex flex-col items-center m-8'>
                <div className='text-3xl font-bold'>Shubhankar Dey</div>
            <div className='spin-border-img m-2'>
              <img className='author-img rounded-full'
                src='https://www.w3schools.com/howto/img_avatar.png' />
            </div>
                      <div className='text-lg font-bold'>Frontend developer<br/>UI/UX</div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Authors
