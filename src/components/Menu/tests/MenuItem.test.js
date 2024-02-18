import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MenuItem } from "../MenuItem"; // Adjust the import path as necessary
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

beforeEach(() => {
  fetch.resetMocks();
});

// Test initial render
test("displays meal thumbnail and name correctly", () => {
  const itemDetails = {
    idMeal: "1",
    strMeal: "Test Meal",
    strMealThumb: "/test-thumb.jpg",
  };
  render(<MenuItem itemDetails={itemDetails} />);

  const mealName = screen.getByText("Test Meal");
  const mealThumb = screen.getByRole("img", { name: "food image stock" });

  expect(mealName).toBeInTheDocument();
  expect(mealThumb).toHaveAttribute("src", "/test-thumb.jpg");
});

// Testing modal opening
test("opens modal on item click", () => {
  const itemDetails = {
    idMeal: "1",
    strMeal: "Test Meal",
  };
  render(<MenuItem itemDetails={itemDetails} />);

  const menuItem = screen.getByText("Test Meal").closest("div");
  fireEvent.click(menuItem);

  const closeButtonModal = screen.getByText("Close");
  expect(closeButtonModal).toBeInTheDocument();
});

// Testing meal details
test("meal details visible", async () => {
  const itemDetails = {
    idMeal: "1",
    strMeal: "Test Meal",
  };

  fetch.mockResponseOnce(JSON.stringify({
    meals: [{ idMeal: "1", strMeal: "Test Meal", strArea: "Test Area" }],
  }));

  render(<MenuItem itemDetails={itemDetails} />);

  await waitFor(() => {
    const mealArea = screen.getByText("Test Area");
    expect(mealArea).toBeInTheDocument();
  });
});
