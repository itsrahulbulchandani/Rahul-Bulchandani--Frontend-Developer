import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FilteringAndSortingSection } from "../FilteringAndSortingSection";
import FoodItemsContext from "../../../contexts/FoodItemsContext";

test("renders FilterDropdown and SortDropdown components", () => {
  const mockContextValue = {
    setSelectedLocation: jest.fn(),
    setIsSorted: jest.fn(),
  };

  render(
    <FoodItemsContext.Provider value={mockContextValue}>
      <FilteringAndSortingSection />
    </FoodItemsContext.Provider>
  );

  const filterDropdownButton = screen.getByText("Filter By Area");
  expect(filterDropdownButton).toBeInTheDocument();

  const sortDropdownButton = screen.getByText("Sort");
  expect(sortDropdownButton).toBeInTheDocument();
});
