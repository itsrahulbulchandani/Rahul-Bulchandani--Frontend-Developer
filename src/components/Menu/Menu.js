import React, { useContext, useEffect, useState } from "react";
import { MenuItem } from "./MenuItem.js";
import { sortFoodItems } from "../../utils/index.js"; //function to sort items alphabetically
import FoodItemsContext from "../../contexts/FoodItemsContext.js";

export const Menu = (props) => {
  const context = useContext(FoodItemsContext);

  const [foodItemList, setFoodItemList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const itemsPerPage = 12;

  // if isSorted is "alpha" sorting the items alphabetically
  useEffect(() => {
    let foodItems = context.foodItems.meals;
    if (context.isSorted === "alpha") {
      foodItems = sortFoodItems(context.foodItems.meals);
    }
    setFoodItemList(foodItems);
  }, [context.foodItems, context.isSorted]);

  useEffect(() => {
    setCurrentPage(1);
  }, [foodItemList]);

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItemsTemp = foodItemList?.slice(
      indexOfFirstItem,
      indexOfLastItem
    );
    setCurrentItems(currentItemsTemp);
  }, [currentPage, foodItemList]);

  // Change page handler
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total pages
  const totalPages = Math.ceil(foodItemList?.length / itemsPerPage);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-x-20 z-10">
        {currentItems?.map((item, index) => (
          <MenuItem key={index} itemDetails={item} />
        ))}
      </div>
      {/* pagination buttons */}
      <div className="flex justify-center pt-4 pb-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index + 1)}
            disabled={currentPage === index + 1}
            // if page is selected show orange border and orange bold text else show gray border and gray text
            className={`h-6.5 w-6 mr-1 ml-1 border ${
              currentPage === index + 1
                ? "border-orange-500 rounded font-bold text-orange-500"
                : "rounded border-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
