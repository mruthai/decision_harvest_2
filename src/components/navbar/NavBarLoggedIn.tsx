import React, { useContext } from "react";
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthProvider";

const NavBarLoggedIn: React.FC = () => {
  const { handleSignOut } = useContext(AuthContext);

  return (
    <nav className="flex flex-row md:h-32 h-20 justify-evenly items-center gap-5 bg-gray-200">
      <div className="flex flex-row gap-4">
      <Link to="/dashboard">dashboard</Link>
      <Link to="/cornhistory">Corn History</Link>
      </div>
      <div className="flex flex-row gap-2">
        <button className="text-gray-50 bg-gray-600 px-4 py-1 rounded-xl" onClick={handleSignOut}>Sign Out</button>

      </div>
    </nav>
  );
};

export default NavBarLoggedIn;
