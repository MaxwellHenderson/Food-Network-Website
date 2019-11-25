/* Imported modules */
const Joi = require("joi");
const {
  getMeals,
  createMeal,
  updateMeal,
  deleteMeal
} = require("./meal-engine");

/*************** Exported Functions ***************/

displayListings = (request, response) => {
  getMeals().then(listings => {
    return response.send(listings);
  });
};

createListing = async (request, response) => {
  validateMeal(request, response);

  /* Create meal object and insert into listings*/
  const listings = await getMeals();
  const meal = {
    mealID: listings.length ? listings.length + 1 : 1,
    mealName: request.body.mealName,
    mealPrice: request.body.mealPrice,
    mealDescription: request.body.mealDescription,
    mealImagePath: request.body.mealImagePath
  };

  // createMeal(meal).then(() => displayListings(request, response));
  createMeal(meal).then(() => {
    return response.send(meal);
  });
};

updateListing = async (request, response) => {
  meal = await getMeal(request, response);

  /* Update meal info */
  meal.mealName = request.body.mealName;
  meal.mealPrice = request.body.mealPrice;
  meal.mealDescription = request.body.mealDescription;
  updateMeal(meal).then(() => displayListings(request, response));
};

deleteListing = async (request, response) => {
  meal = await getMeal(request, response);
  deleteMeal(meal).then(() => displayListings(request, response));
};

/*************** Helper Functions ***************/

validateMeal = (request, response) => {
  const meal = request.body;
  const schema = {
    mealName: Joi.string()
      .min(3)
      .required()
  };
  /* Validate by comparing schema with meal object */
  const { error } = Joi.validate(meal, schema);
  if (error) return response.status(400).send(error.details[0].message);
};

getMeal = async (request, response) => {
  /* Check to see whether meal exists */
  const listings = await getMeals();
  const meal = listings.find(
    meal => meal.mealID === parseInt(request.params.mealID)
  );
  if (!meal)
    return response
      .status(404)
      .send(`Meal with ID ${request.params.mealID} does not exist`);
  return meal;
};

module.exports = {
  displayListings,
  createListing,
  updateListing,
  deleteListing
};
