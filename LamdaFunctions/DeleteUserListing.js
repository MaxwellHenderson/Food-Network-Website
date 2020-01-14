'use strict';
const AWS = require('aws-sdk');


exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();
  
  let responseBody = "";
  let statusCode = 0;

  //const { mealID } = event.pathParameters;

  const params = {
    TableName: "meals",
    Key: {
        //mealID: mealID
        mealID: 200
    }
  };

  try {
    const data = await documentClient.delete(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 204;
  } catch(err) {
    responseBody = `Unable to delete product: ${err}`;
    statusCode = 403;
  }

  const response = {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json"
    },
    body: responseBody
  };

  return response;
};