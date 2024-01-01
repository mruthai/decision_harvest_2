import React from "react";
import NavBarLoggedOut from "../components/navbar/NavBarLoggedOut"

const Home: React.FC = () => {
  return (
    <div className="h-screen">
      <NavBarLoggedOut />
      <div className="flex flex-col justify-center items-center h-56 space-y-5">
      <h1 className="font-bold md:text-[60px] text-2xl text-center ">Decision Harvest</h1>
        <h3 className="md:text-2xl text-xl md:text-justify text-center ">
           Decision Harvest creates solutions for small to mid-size farmers.
        </h3>

      </div>
      
    </div>
  );
};
export default Home;
