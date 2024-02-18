import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FoodItemDetailsModal } from "../FoodItemDetailsModal";
import userEvent from "@testing-library/user-event";

const mockDetails = {
  meals: [
    {
      strMeal: "Test Meal",
      strMealThumb: "/test-thumb.jpg",
      strArea: "Test Area",
      strCategory: "Vegetarian",
    },
  ],
};

// Testing modal visibility
test("modal is visible when showModalToggle is true", () => {
  render(
    <FoodItemDetailsModal
      showModalToggle={true}
      setShowModalToggle={() => {}}
      details={mockDetails.meals}
    />
  );

  expect(screen.getByText("Test Meal")).toBeInTheDocument();
  expect(screen.getByText(/₹/i)).toBeInTheDocument();
  expect(screen.getByText("Test Area")).toBeInTheDocument();
  expect(screen.getByText("Vegetarian")).toBeInTheDocument();
});

// Test modal is not visible when showModalToggle is false
test("modal is not visible when showModalToggle is false", () => {
  render(
    <FoodItemDetailsModal
      showModalToggle={false}
      setShowModalToggle={() => {}}
      details={mockDetails.meals}
    />
  );

  expect(screen.queryByText("Test Meal")).not.toBeInTheDocument();
});

// Test close functionality
test("modal closes when close button is clicked", async () => {
  const setShowModalToggle = jest.fn();

  render(
    <FoodItemDetailsModal
      showModalToggle={true}
      setShowModalToggle={setShowModalToggle}
      details={mockDetails.meals}
    />
  );

  await userEvent.click(screen.getByText("Close"));
  expect(setShowModalToggle).toHaveBeenCalledWith(false);
});
