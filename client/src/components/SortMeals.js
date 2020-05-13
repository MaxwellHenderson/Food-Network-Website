let sortMealByName = (foodItems) => {
  return foodItems.sort((meal, otherMeal) =>
    meal.mealName.toLowerCase() > otherMeal.mealName.toLowerCase() ? 1 : -1
  );
};

let sortMealByPrice = (foodItems) => {
  return foodItems.sort((meal, otherMeal) =>
    parseInt(meal.mealPrice) > parseInt(otherMeal.mealPrice) ? 1 : -1
  );
};

let sortMealByDate = (foodItems) => {
  return foodItems.sort(
    (meal, otherMeal) =>
      new Date(meal["listingTimestamp"]) -
      new Date(otherMeal["listingTimestamp"])
  );
};

let sortMeals = (sortOption, foodItems) => {
  if (sortOption === "Name") return sortMealByName(foodItems);
  else if (sortOption === "Date Posted") return sortMealByDate(foodItems);
  else return sortMealByPrice(foodItems);
};

export default sortMeals;
