
'use strict';
const AWS = require('aws-sdk');

AWS.config.update({ region: "us-west-2"});

exports.handler = async (event, context) => {
  const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08"});
  const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-west-2"});

  let responseBody = "";
  let statusCode = 0;

  //const { mealID, mealDescription, mealImagePath, mealName, mealPrice } = JSON.parse(event.body);

  const params = {
    TableName: "meals",
    Item: {
      // mealID: mealID,
      // mealDescription: mealDescription,
      // mealImagePath: mealImagePath,
      // mealName: mealName,
      // mealPrice: mealPrice
      mealID: 100,
      mealDescription: "This is a burrito",
      mealImagePath: "https://foodimagebucket.s3-us-west-2.amazonaws.com/cookies.jpg",
      mealName: "Burrito",
      mealPrice: "10.00"
    }
  };

  try {
    const data = await documentClient.put(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 201;
  } catch (err) {
    responseBody = `Unable to put user data`;
    statusCode = 403;
  }

  const response = {
    statusCode: statusCode,
    headers: {
      "Content-Type":"application/json"
    },
    body: responseBody
  };

  return response;
};