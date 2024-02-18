import React, { useEffect, useState } from "react";
import Navbar from "./Navbar/Navbar.js";
import { Menu } from "./Menu/Menu.js"; // Menu grid component
import { FilteringAndSortingSection } from "./FilterAndSort/FilteringAndSortingSection.js"; // filter and sort menu
import FoodItemsContext from "../contexts/FoodItemsContext.js";
import { Footer } from "./HeaderAndFooter/Footer.js";

export const Home = () => {
  const [foodItems, setFoodItems] = useState({});
  const [selectedLocation, setSelectedLocation] = useState("Indian");
  const [isSorted, setIsSorted] = useState("");

  const contextValue = {
    foodItems,
    isSorted,
    setSelectedLocation,
    setIsSorted,
  };

  // fetching food items based on selected location (default 'Indian')
  const getFoodItems = async (selectedLocation) => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedLocation}`
      );
      console.log(response);
      const foodItemsObj = await response.json();
      setFoodItems(foodItemsObj);
    } catch (error) {
      console.log(error);
    }
  };

  // fetching food items whenever location is changed from the filters
  useEffect(() => {
    getFoodItems(selectedLocation);
  }, [selectedLocation]);

  return (
    <FoodItemsContext.Provider value={contextValue}>
      <Navbar />
      <div className="ml-20 mr-10">
        <h1 className="mt-7 font-bold text-2xl">
          Resturants with online food delivery in Ghaziabad
        </h1>
        <div className="mt-6">
          <FilteringAndSortingSection />
        </div>
        <div className="flex justify-center">
          <Menu />
        </div>
      </div>
      <Footer />
    </FoodItemsContext.Provider>
  );
};
