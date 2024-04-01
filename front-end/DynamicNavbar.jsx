
import {useState} from 'react';
import './styling.css'

function DynamicNavbar() {

  const [isActive, setIsActive] = useState(false);

  const handleClick = event => {
    setIsActive(current => !current);
    
  };

  return (
    <div className=" text-white">
        <header className="  text-lg ">
          <nav className='flex mx-auto items-center justify-between '>
            <div className='mx-6 text-5xl'>           
                <a className='title' href='/'>AAAA </a>
            </div>
            <div className= {'nav-menu bg-[#630035] md:bg-opacity-0 flex duration-200 justify-between  gap-[4vw] md:flex-row  items-center md:static md:min-h-fit md:w-auto flex-col absolute min-h-[40vh] left-0  w-full top-[-100%]' + (isActive ? ' top-[0%]' : '' )}>
              <ul className='flex'>
                <li>
                  <a className='nav-element' href='#'>About</a>
                </li>
              </ul>
              <ul>
                <li>
                  <a className='nav-element' href='/creators'>Creators</a>
                </li>
              </ul>
              <ul>
                <li>
                  <a className='nav-element' href='#'>Timeline````</a>
                </li>
              </ul>
              <ul>
                <li>
                  <a className='nav-element' href='#'>Ereators</a>
                </li>
              </ul>
            </div>
            <div className='flex items-center gap-0'>
              <a href='/login' className='bg-[#630035] grad-btn px-2 md:px-6 py-2 transition-all
              rounded-full  hover:bg-[#71003c54] '>Login/Signup</a>
            <div className= {(isActive ? 'show' : 'hide') + ' cursor-pointer + md:hidden p-6'} 
                onClick={handleClick} >
              <div className='bar1'></div>
              <div className='bar2'></div>
            </div>
            </div>
          </nav>
        </header>
    </div>
  )
}

export default DynamicNavbar
