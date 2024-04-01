import '../styling.css'
import React from 'react'
import Dropzone from 'react-dropzone'

function DropFiles() {
    return (
        <div className='w-full h-[80vh] text-white mt-20 flex justify-center backdrop-blur-sm px-8'>
            <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (
                    <section className='w-full'>
                        <div {...getRootProps()} className="dropzone h-[80%] w-full border-8
                        border-dashed rounded-3xl">
                            <input {...getInputProps()} />
                            <p className='py-16 text-center text-xl'>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                    </section>
                )}
            </Dropzone>
        </div>
    )
}

export default DropFiles
