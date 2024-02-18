import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Menu } from "../Menu";
import FoodItemsContext from "../../../contexts/FoodItemsContext";

describe("Menu Component", () => {
  const mockFoodItems = {
    meals: [
      { idMeal: "1", strMeal: "Chicken Soup" },
      { idMeal: "2", strMeal: "Beef Stew" },
    ],
  };

  test("renders menu items", () => {
    render(
      <FoodItemsContext.Provider
        value={{ foodItems: mockFoodItems, isSorted: "" }}
      >
        <Menu />
      </FoodItemsContext.Provider>
    );

    // Check for presence of menu items
    expect(screen.getByText("Chicken Soup")).toBeInTheDocument();
    expect(screen.getByText("Beef Stew")).toBeInTheDocument();
  });

  test("pagination controls appear when necessary", () => {
    // Assuming we have more than 12 items and need to test pagination
    const manyMeals = new Array(13)
      .fill(0)
      .map((_, index) => ({ idMeal: `${index}`, strMeal: `Meal ${index}` }));

    render(
      <FoodItemsContext.Provider
        value={{ foodItems: { meals: manyMeals }, isSorted: "" }}
      >
        <Menu />
      </FoodItemsContext.Provider>
    );

    // Check for pagination button for page 2
    const page2Button = screen.getByRole("button", { name: "2" });
    expect(page2Button).toBeInTheDocument();
  });

  test("sorts food items alphabetically when sorted", () => {
    // This test assumes the sortFoodItems function sorts the meals array alphabetically by strMeal
    const mockNotSortedFoodItems = {
      meals: [
        { idMeal: "2", strMeal: "Chicken Soup" },
        { idMeal: "1", strMeal: "Beef Stew" },
      ],
    };

    const { container } = render(
      <FoodItemsContext.Provider
        value={{ foodItems: mockNotSortedFoodItems, isSorted: "alpha" }}
      >
        <Menu />
      </FoodItemsContext.Provider>
    );

    // Assuming the class name of the div containing the meal name is "font-semibold text-l text-gray-800"
    const allMeals = container.querySelectorAll(
      ".font-semibold.text-l.text-gray-800"
    );

    expect(allMeals[0]).toHaveTextContent("Beef Stew");
    expect(allMeals[1]).toHaveTextContent("Chicken Soup");
  });
});
