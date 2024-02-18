import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import fetchMock from "jest-fetch-mock";
import { Home } from "../Home";

const createContextMock = () => React.createContext();
jest.mock("../../contexts/FoodItemsContext.js", () => ({
  __esModule: true,
  default: createContextMock(),
}));

beforeEach(() => {
  fetchMock.resetMocks();
});

test("renders Home component", () => {
  render(<Home />);
  const headerText = screen.getByText(
    /Resturants with online food delivery in Ghaziabad/i
  );
  expect(headerText).toBeInTheDocument();
});

test("default call to Indian list", async () => {
  fetchMock.mockResponses(
    [JSON.stringify({ meals: [] }), { status: 200 }],
    [
      JSON.stringify({
        meals: [],
      }),
      { status: 200 },
    ]
  );
  render(<Home />);
  await waitFor(() => {
    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
    );
  });

  await waitFor(() => {
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      "https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian"
    );
  });
});
