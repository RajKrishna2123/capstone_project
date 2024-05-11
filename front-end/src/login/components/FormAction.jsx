export default function FormAction({
    handleSubmit,
    type='Button',
    action='submit',
    text
}){
    return(
        <div className="flex justify-center">
        {
            type==='Button' ?
            <button
                type={action}
                className="group relative w-[80%] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#3f1f3e] hover:bg-[#a86877] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
                onSubmit={handleSubmit}
            >

                {text}
            </button>
            :
            <></>
        }
        </div>
    )
}