import React from "react";
// importing logos
import swiggy_logo from "../../images/swiggy_logo.png";
import search_icon from "../../images/kisspng-magnifying-glass-computer-icons-clip-art-5adba2490e8373.7973557915243433690595.jpg";

const Navbar = () => {
  return (
    <div className="shadow-md pl-8 pr-20 mt-3 pb-2 flex justify-between items-center w-full">
      <img src={swiggy_logo} className="w-auto h-8" />
      {/* search bar */}
      <div className="border border-gray-300 flex items-center bg-gray-200 rounded w-full xs:max-w-xs md:max-w-md">
        <input
          placeholder="Search for restaurant and food"
          className="text-sm bg-gray-200 p-3 h-10 w-full"
        />
        <img src={search_icon} className="w-4 h-4 mr-2" />
      </div>
    </div>
  );
};

export default Navbar;
