import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SortDropdown } from "../SortDropdown"; // Adjust the import path as necessary
import FoodItemsContext from "../../../contexts/FoodItemsContext"; // Adjust the import path as necessary

// Mock context provider
const mockSetIsSorted = jest.fn();

const wrapper = ({ children }) => (
  <FoodItemsContext.Provider value={{ setIsSorted: mockSetIsSorted }}>
    {children}
  </FoodItemsContext.Provider>
);

// Testing dropdown toggle
test("toggles dropdown on button click", () => {
  render(<SortDropdown />, { wrapper });

  const button = screen.getByText("Sort");
  fireEvent.click(button);
  expect(screen.getByText(/Alphabetically/i)).toBeInTheDocument();

  fireEvent.click(button);
  // Assuming your implementation hides the dropdown upon a second click, adjust as necessary
  expect(screen.queryByText(/Alphabetically/i)).not.toBeInTheDocument();
});

// Test radio button selection and apply functionality
test("selects alphabetical sort and applies it", () => {
  render(<SortDropdown />, { wrapper });

  const button = screen.getByText("Sort");
  fireEvent.click(button); // Open dropdown

  const radioButton = screen.getByLabelText(/Alphabetically/i);
  fireEvent.click(radioButton);

  const applyButton = screen.getByText("apply");
  fireEvent.click(applyButton);

  expect(mockSetIsSorted).toHaveBeenCalledWith("alpha");
});

// Test clear functionality
test("clears selected sort", () => {
  render(<SortDropdown />, { wrapper });

  const button = screen.getByText("Sort");
  fireEvent.click(button); // Open dropdown

  const clearButton = screen.getByText("clear");
  fireEvent.click(clearButton);

  expect(mockSetIsSorted).toHaveBeenCalledWith("");
});
