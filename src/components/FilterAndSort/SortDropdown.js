import React, { useContext, useEffect, useState } from "react";
import FoodItemsContext from "../../contexts/FoodItemsContext.js";

//importing logo image
import filter_logo2 from "../../images/filter_logo2.webp";

export const SortDropdown = () => {
  const context = useContext(FoodItemsContext);

  const [selected, setSelected] = useState(""); //radio element state
  const [selectedApplied, setSelectedApplied] = useState(""); // final state applied using apply button
  const [open, setOpen] = useState(false); // dropdown toggle state

  // applying seleted sort when apply button is clicked
  useEffect(() => {
    context.setIsSorted(selectedApplied);
  }, [selectedApplied]);

  return (
    <>
      <div className="w-36 font-medium h-12 relative">
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
            {selectedApplied === "alpha" ? (
              "Alphabetically"
            ) : (
              <div className="flex items-center justify-between space-x-2">
                <span>Sort</span>{" "}
                <img className="w-5.5 h-6" src={filter_logo2} />
              </div>
            )}
          </div>
        </button>
        {/* dropdown list of available sorts shown when open is set to true */}
        {open && (
          <div className="bg-white">
            <ul
              className={`relative bg-white mt-2 drop-shadow-2xl border border-gray-300 rounded-tl-2xl rounded-tr-2xl overflow-y-auto z-50 max-h-60`}
            >
              {/* alphabetical sort list item */}
              <li
                className={
                  "p-2 text-sm hover:bg-orange-500 hover:text-white flex items-center"
                }
              >
                {/* radio button for list entry */}
                <input
                  type="radio"
                  onChange={() => {
                    // if newly selected item is not "alpha"
                    if (selected?.toLowerCase() !== "alpha") {
                      setSelected("alpha");
                    }
                  }}
                  checked={selected?.toLowerCase() === "alpha"}
                  id="alpha"
                />
                <label htmlFor="alpha" className="ml-2">
                  {" "}
                  Alphabetically
                </label>
              </li>
            </ul>
            <div className="relative z-50 bg-orange-500 h-10 border-r border-r-orange-500 border-l border-l-orange-500 border-b border-b-orange-500 w-36 grid grid-cols-2 items-center rounded-br-md rounded-bl-md shadow-md cursor-pointer">
              {/* Apply and Clear buttons */}
              <div
                className="flex justify-center border-r border-gray-300"
                onClick={() => {
                  // if selected item is not already applied, apply the newly selected item
                  if (selected !== selectedApplied) {
                    setSelectedApplied(selected);
                    setOpen(false);
                  }
                }}
              >
                apply
              </div>
              <div
                className="flex justify-center"
                onClick={() => {
                  // if newly is selected item is not '', on click of clear, set the selected item to '', i.e, removing sort
                  if (selected !== "") {
                    setSelectedApplied("");
                    setSelected("");
                    setOpen(false);
                  }
                }}
              >
                clear
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
