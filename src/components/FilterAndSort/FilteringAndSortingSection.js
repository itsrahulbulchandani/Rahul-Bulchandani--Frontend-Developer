import React from "react";
import { FilterDropdown } from "./FilterDropdown.js"; // filter dropdown component (location filter)
import { SortDropdown } from "./SortDropdown.js"; // sorting component (alphabetically)

export const FilteringAndSortingSection = () => {
  return (
    <div className="flex">
      <div className="pr-2">
        <FilterDropdown />
      </div>
      <SortDropdown />
    </div>
  );
};
