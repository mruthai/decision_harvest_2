import React from 'react'
import { Link } from "react-router-dom";
import images from "../../constant/images";

const NavBarLoggedOut:React.FC = () => {
  return (
    <nav className="flex flex-row md:h-32 h-20 justify-evenly items-center gap-5 bg-gray-200">
        <div>
        <Link to="/"> <img className="h-10 w-10" src={images.farms}/> </Link>
        </div>
        <div className="flex flex-row gap-2">
        <button className="text-gray-50 bg-gray-600 px-4 py-1 rounded-xl"><Link  to="/signup">Sign Up</Link></button>
        <button className="text-gray-50 bg-gray-600 px-4 py-1 rounded-xl"><Link  to="/login">Login</Link></button>

        </div>
       
    </nav>
  )
}

export default NavBarLoggedOut