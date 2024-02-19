import React, { useEffect, useState } from "react";
import rating_icon from "../../images/rating_icon.png";
import { FoodItemDetailsModal } from "../FoodItemDetailsModal/FoodItemDetailsModal.js";

export const MenuItem = ({ itemDetails }) => {
  const [menuItemDetails, setMenuItemDetails] = useState({});
  const [showModalToggle, setShowModalToggle] = useState(false);

  const getMealDetails = async (foodId) => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`
      );
      const details = await response.json();
      setMenuItemDetails(details);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMealDetails(itemDetails?.idMeal);
  }, [itemDetails]);

  return (
    <>
      <div
        className="overflow-hidden mt-4 flex flex-col transform transition duration-500 hover:scale-110 z-30"
        onClick={() => setShowModalToggle(true)}
      >
        <img
          className="w-full rounded-2xl h-48 object-cover"
          src={itemDetails.strMealThumb}
          alt="food image stock"
        />
        <div className="px-4 py-2">
          <div className="font-semibold text-l text-gray-800 object-cover">
            {itemDetails.strMeal.length > 15
              ? itemDetails.strMeal.slice(0, 15) + "..."
              : itemDetails.strMeal}
          </div>
          <div className="flex text-sm items-center text-gray-800 object-cover">
            <img src={rating_icon} className="w-4 rounded-full h-4 mr-2" />
            {(Math.random() * (5 - 1) + 1).toFixed(1)}
          </div>
          <p className="text-gray-500 text-sm">
            {menuItemDetails?.meals?.[0]?.strArea}
          </p>
        </div>
      </div>
      <FoodItemDetailsModal
        showModalToggle={showModalToggle}
        setShowModalToggle={setShowModalToggle}
        details={menuItemDetails?.meals}
      />
    </>
  );
};
