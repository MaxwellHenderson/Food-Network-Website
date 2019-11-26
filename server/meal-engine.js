var AWS = require("aws-sdk");

let awsConfig = {
  region: "us-west-2",
  endpoint: "http://dynamodb.us-west-2.amazonaws.com",
  accessKeyId: "AKIAI2FNOYH6TIMH5UXQ",
  secretAccessKey: "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"
};
AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();

let getMeal = mealID => {
  const params = {
    TableName: "meals",
    Key: {
      mealID: mealID
    }
  };
  docClient.get(params, function(err, data) {
    if (err) {
      console.log("users::getMeal::error - " + JSON.stringify(err, null, 2));
    }
  });
};

let getMeals = async () => {
  const params = {
    TableName: "meals"
  };

  const readPromise = docClient
    .scan(params, function(err, data) {
      if (err) {
        console.log("users::getMeals::error - " + JSON.stringify(err, null, 2));
      }
      return data;
    })
    .promise()
    .then(meals => {
      return meals.Items;
    });
  return readPromise;
};

let createMeal = meal => {
  const { mealID, mealName, mealPrice, mealDescription } = meal;
  console.log(meal);
  const params = {
    TableName: "meals",
    Item: meal
  };
  const insertPromise = docClient
    .put(params, function(err, data) {
      if (err) {
        console.log(
          "users::createMeal::error - " + JSON.stringify(err, null, 2)
        );
      }
    })
    .promise();
  return insertPromise;
};

let updateMeal = meal => {
  const { mealID, mealName, mealPrice, mealDescription } = meal;

  const params = {
    TableName: "meals",
    Key: { mealID: mealID },
    UpdateExpression:
      "SET mealName = :updatedMealName, mealPrice = :updatedMealPrice, mealDescription = :updateMealDescription",
    ExpressionAttributeValues: {
      ":updatedMealName": mealName,
      ":updatedMealPrice": mealPrice,
      ":updateMealDescription": mealDescription
    },
    ReturnValues: "UPDATED_NEW"
  };
  const updatePromise = docClient
    .update(params, function(err, data) {
      if (err) {
        console.log(
          "users::updateMeal::error - " + JSON.stringify(err, null, 2)
        );
      }
    })
    .promise();
  return updatePromise;
};

let deleteMeal = meal => {
  const { mealID } = meal;
  var params = {
    TableName: "meals",
    Key: {
      mealID: mealID
    }
  };
  deletePromise = docClient
    .delete(params, function(err, data) {
      if (err) {
        console.log(
          "users::deleteMeal::error - " + JSON.stringify(err, null, 2)
        );
      }
    })
    .promise();
  return deletePromise;
};

module.exports = { getMeal, getMeals, createMeal, updateMeal, deleteMeal };
