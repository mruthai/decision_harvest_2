import React from "react";
import { Link } from "react-router-dom";
import images from "../../constant/images";

const NavBarLoggedOut: React.FC = () => {
  return (
    <nav className="flex flex-row md:h-32 h-20 bg-gray-200 justify-between">
      <div className="flex items-center md:ml-56 ml-2">
        <Link to="/">
          <img
            className="md:h-20 md:w-20 h-10 w-10"
            src={images.farms}
          />
        </Link>
        <p className="font-bold text-xl text-center ">
            Decision Harvest
          </p>
      </div>
      <div className="flex items-center justify-center md:mr-56 mr-2">
        <button className="text-gray-50 bg-gray-600 px-6 py-1  rounded-xl">
          <Link to="/login">Login</Link>
        </button>
      </div>
    </nav>
  );
};

export default NavBarLoggedOut;
