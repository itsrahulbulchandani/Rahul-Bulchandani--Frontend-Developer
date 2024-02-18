export const sortFoodItems = (foodItems) => {
  return foodItems.sort((a, b) => a.strMeal.localeCompare(b.strMeal));
};
