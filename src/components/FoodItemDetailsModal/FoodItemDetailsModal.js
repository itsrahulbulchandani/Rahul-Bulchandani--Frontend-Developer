import React, { useEffect, useState } from "react";
import rating_icon from "../../images/rating_icon.png";
import non_veg_icon from "../../images/non-veg-icon.png";
import veg_icon from "../../images/veg_symbol.png";

export const FoodItemDetailsModal = ({
  showModalToggle,
  setShowModalToggle,
  details,
}) => {
  return (
    <>
      {showModalToggle ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
            <div className="relative w-82 my-6 mx-auto max-w-3xl">
              <div className="border border-gray-300 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="relative p-6 flex-auto">
                  <img
                    className="w-full rounded-2xl h-96"
                    src={details?.[0].strMealThumb}
                    alt="food image stock"
                  />
                  <div className="px-4 py-2">
                    <div className="font-semibold text-xl text-gray-800">
                      {details?.[0].strMeal.length > 15
                        ? details?.[0].strMeal.slice(0, 15) + "..."
                        : details?.[0].strMeal}
                    </div>
                    <div className="flex text-sm items-center text-gray-800">
                      <img
                        src={rating_icon}
                        className="w-4 rounded-full h-4 mr-2"
                      />
                      {(Math.random() * (5 - 1) + 1).toFixed(1)}
                    </div>
                    <p className="text-gray-800 pb-1 pt-1 text-l">
                      ₹{Math.floor(Math.random() * (500 - 100 + 1)) + 100}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {details?.[0]?.strArea}
                    </p>
                    <p className="flex items-center text-gray-600 text-sm">
                      {details?.[0]?.strCategory}
                      <img
                        src={
                          details?.[0]?.strCategory === "Vegetarian"
                            ? veg_icon
                            : non_veg_icon
                        }
                        className="w-4 h-4 ml-1 mr-2 mt-0.5"
                      />
                    </p>
                  </div>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-1 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-orange-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModalToggle(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
