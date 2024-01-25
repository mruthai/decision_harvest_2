import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { IoMenu, IoCloseSharp } from "react-icons/io5";
import images from "../../constant/images";

const NavBarLoggedIn: React.FC = () => {
  const { handleSignOut, user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen); // Toggle the state
  };

  return (
    <>
    <nav className="bg-gray-200 md:h-32 h-20 flex justify-between md:justify-evenly items-center px-10 py-2">
        <img
          className="h-10 w-10 md:h-20 md:w-20"
          src={images.farms}
        />
        <p className="font-bold text-xl text-center ">
            Decision Harvest
          </p>
        <button
          className="md:hidden"
          onClick={handleToggle}>
          <IoMenu size={25} />
        </button>
    
      <div className="hidden md:flex flex-row gap-4">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/cornhistory">Corn History</Link>
        <button
          className=""
          onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
      <div
        className={`md:hidden ${
          isOpen ? "flex" : "hidden"
        } flex-col items-center fixed inset-0 bg-gray-200 z-50`}>
        <button
          className="text-gray-50 bg-gray-600 px-2 py-2 m-2 rounded-full self-end"
          onClick={handleToggle}>
          <IoCloseSharp size={25} />
        </button>
        <div className="flex flex-col items-center gap-4 mt-10">
          <Link
            to="/dashboard"
            className="text-xl"
            onClick={() => setIsOpen(false)}>
            Dashboard
          </Link>
          <Link
            to="/cornhistory"
            className="text-xl"
            onClick={() => setIsOpen(false)}>
            Corn History
          </Link>
          <button
            className="text-xl text-orange-500"
            onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </div>
    </nav>
      <div className="bg-slate-200 flex flex-col justify-center items-center">
      <p>{user && user.email}</p>
      </div>
    </>
  );
};

export default NavBarLoggedIn;
