import React, { useContext, useEffect, useState } from "react";
import FoodItemsContext from "../../contexts/FoodItemsContext.js";
//importing logo image
import filter_logo2 from "../../images/filter_logo2.webp";

export const FilterDropdown = () => {
  const context = useContext(FoodItemsContext);

  const [countries, setCountries] = useState(null);
  const [selected, setSelected] = useState("Indian"); //radio element state
  const [selectedApplied, setSelectedApplied] = useState("Indian"); // final state applied using apply button
  const [open, setOpen] = useState(false); // dropdown toggle state

  // fetching countries for dropdown list
  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data.meals);
      })
      .catch((error) => console.log(error));
  }, []);

  // applying seleted location when apply button is clicked
  useEffect(() => {
    context.setSelectedLocation(selectedApplied);
  }, [selectedApplied]);

  return (
    <>
      <div className="w-fit font-medium h-12 relative">
        {/* dropdown button */}
        <button
          onClick={() => {
            setOpen(!open);
            setSelected(selectedApplied);
          }}
          className={`border border-gray-300 pl-2 pr-2 h-10 text-xs bg-white w-auto mb-1 flex items-center rounded-3xl ${
            !selected && "text-gray-700"
          }`}
        >
          {/* dropdown button text and icon */}
          <div className="flex items-center pr-2 pl-2">
            {selectedApplied !== "Indian" ? (
              selectedApplied
            ) : (
              <div className="flex items-center justify-between space-x-2">
                <span>Filter By Area</span>{" "}
                <img className="w-5.5 h-6" src={filter_logo2} />
              </div>
            )}
          </div>
        </button>
        {/* dropdown list of countries shown when open is set to true */}
        {open && (
          <div className="bg-white absolute w-36 z-50">
            <ul
              className={`bg-white mt-2 drop-shadow-2xl border border-gray-300 rounded-tl-2xl rounded-tr-2xl overflow-y-auto relative z-50 max-h-52`}
            >
              {/* creating list of countries */}
              {countries?.map((country) => (
                <li
                  key={country?.strArea}
                  className={
                    "p-2 text-sm hover:bg-orange-500 hover:text-white flex items-center"
                  }
                >
                  {/* radio button for list entry */}
                  <input
                    type="radio"
                    value={country?.strArea}
                    onChange={() => {
                      // if newly selected item is not already selected
                      if (
                        country?.strArea?.toLowerCase() !==
                        selected.toLowerCase()
                      ) {
                        setSelected(country?.strArea);
                      }
                    }}
                    checked={
                      country?.strArea?.toLowerCase() === selected.toLowerCase()
                    }
                    id={country?.strArea}
                  />
                  {/* label based on country name, if indian adding (default) after the name */}
                  <label className="ml-2">
                    {" "}
                    {country?.strArea?.toLowerCase() === "indian"
                      ? country?.strArea + "(default)"
                      : country?.strArea}
                  </label>
                </li>
              ))}
            </ul>
            {/* Apply and Clear buttons */}
            <div className="h-10 relative z-50 bg-orange-500 border-r border-r-orange-500 border-l border-l-orange-500 border-b border-b-orange-500 w-36 grid grid-cols-2 items-center rounded-br-md rounded-bl-md shadow-md cursor-pointer">
              <button
                className="bg-orange-500 flex justify-center border-r border-gray-300"
                onClick={() => {
                  // if selected item is not already applied, apply the newly selected item
                  if (selected !== selectedApplied) {
                    setSelectedApplied(selected);
                    setOpen(false);
                  }
                }}
              >
                apply
              </button>
              <button
                className="bg-orange-500 flex justify-center"
                onClick={() => {
                  // if newly is selected item is not 'Indian', on click of clear, set the selected item to 'Indian'
                  if (selected !== "Indian") {
                    setSelectedApplied("Indian");
                    setSelected("Indian");
                    setOpen(false);
                  }
                }}
              >
                clear
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
