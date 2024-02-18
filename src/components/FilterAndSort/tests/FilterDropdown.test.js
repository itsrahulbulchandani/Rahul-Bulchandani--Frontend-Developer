import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FilterDropdown } from "../FilterDropdown"; 
import FoodItemsContext from "../../../contexts/FoodItemsContext";

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          meals: [{ strArea: "Indian" }, { strArea: "Italian" }],
        }),
    })
  );
});

const mockSetSelectedLocation = jest.fn();

const wrapper = ({ children }) => (
  <FoodItemsContext.Provider
    value={{ setSelectedLocation: mockSetSelectedLocation }}
  >
    {children}
  </FoodItemsContext.Provider>
);

test("renders and toggles dropdown", async () => {
  render(<FilterDropdown />, { wrapper });

  // Toggle dropdown
  fireEvent.click(screen.getByText("Filter By Area"));
  await waitFor(() => screen.getByText("Indian(default)"));
  expect(screen.getByText("Italian")).toBeInTheDocument();
});
