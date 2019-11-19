/* Imported modules */
const {
  displayListings,
  createListing,
  updateListing,
  deleteListing
} = require("./meal-service");

const express = require("express");

/* Create express application */
const app = express();

/* Make express app listen to port */
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

/* Middleware */
/* This middleware is used to deserialize incoming JSON objects ONLY when the POST and PUT requests are called */
app.use(express.json());

/*** Read requests ***/
app.get("/welcome", (request, response) => {
  response.send({ express: "Welcome to our Food Network!" });
});

/*** Read/Create requests ***/
app
  .route("/listings")
  .get((request, response) => {
    displayListings(request, response);
  })
  .post((request, response) => {
    createListing(request, response);
  });

/*** Update/Delete requests ***/

app
  .route("/listings/:mealID")
  .put((request, response) => {
    updateListing(request, response);
  })
  .delete((request, response) => {
    deleteListing(request, response);
  });
