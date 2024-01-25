import React from "react";
import NavBarLoggedOut from "../components/navbar/NavBarLoggedOut";
import { Link } from "react-router-dom";
import images from "../constant/images";

const Home: React.FC = () => {
  return (
    <div className="">
      <NavBarLoggedOut />
      <div className="m-2">
  <div className="flex md:flex-row flex-col-reverse justify-evenly items-center w-full max-w-screen-2xl mx-auto border-2 p-0 rounded-lg my-10">
    <div className="flex flex-col justify-center items-start space-y-5 max-w-xl lg:max-w-2xl p-5">
      <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold">
        Decision Harvest creates solutions for small to mid-size farmers.
      </h1>
      <h3>
        We pull in monthly commodities data to help you with your business calculations.
      </h3>
      <button className="mt-10 text-gray-50 bg-orange-600 px-4 py-1 rounded-xl">
        <Link to="/signup">Sign Up</Link>
      </button>
    </div>
    <div className="flex justify-center items-center max-w-xl lg:max-w-2xl p-5">
      <img
        className="rounded-lg w-full max-w-md md:max-w-lg lg:max-w-xl md:h-[500px] h-64 object-cover"
        src={images.hero}
        alt="Hero Image Farming Decision"
      />
    </div>
  </div>
</div>


      <div className="h-20"></div>
    </div>
  );
};
export default Home;
