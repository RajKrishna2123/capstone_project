import {Link} from 'react-router-dom';
import logo from "/logo.svg";

export default function Header({
    heading,
    paragraph,
    linkName,
    linkUrl="#"
}){
    return (
      <div className="mb-10">
        <div className="flex justify-center">
          <a className="h-auto w-auto flex flex-row items-center">
            <img src={logo} className="h-[100px]" />
          </a>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          {heading}
        </h2>
        <p className="text-center text-sm text-gray-100 mt-5">
          {paragraph}{" "}
          <Link
            to={linkUrl}
            className="font-medium text-cyan-500 hover:text-[#713ae9]"
          >
            {linkName}
          </Link>
        </p>
      </div>
    );
}