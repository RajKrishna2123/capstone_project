import React from 'react'

function ContactForm() {
    return (
        <div className='grid place-content-center'>
            <div className='fade-in-content spin-border h-[450px] flex justify-center items-center text-xl mt-20 mb-4'>
                <div className='flex  w-[30vw] h-full px-16 py-4  flex-col gap-10 border-r-0
					 bg-gradient-to-br from-green-700 to-blue-700 rounded-l-[2rem]'>
                    <h3 className='text-3xl text-white'>Send us a message</h3>
                    <input type="text" className=" border-b-2 px-2" name="name" placeholder="Name" />
                    <input type="email" className=" border-b-2 px-2" name="email" placeholder="Email" />
                    <textarea name="message" className='border-b-2 px-2' placeholder='Message' rows='6' />
                </div>
                <div className='flex border-l-4 w-[30vw] h-full py-4 px-16 
                flex-col gap-6 text-white rounded-r-[2rem] bg-[#050016]'>
                    <h3 className='text-3xl'>Contact Us!</h3>
                    <h4 className='text-lg font-light'>We're open for any suggestion or just to have a chat.</h4>
                    <h4 className='text-sm font-extralight'>*contact details below*</h4>

                </div>
            </div>
        </div>
    )
}

export default ContactForm
