export default function FormExtra(){
    return (
      <div className="flex items-center justify-between ">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-[#a86877] focus:ring-b border-gray-300 rounded"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-white"
          >
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <a
            href="#"
            className="font-medium text-cyan-500 hover:text-[#713ae9]"
          >
            Forgot your password?
          </a>
        </div>
      </div>
    );
}