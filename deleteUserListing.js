'use strict';
const AWS = require('aws-sdk');


exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();
  
  let responseBody = "";
  let statusCode = 0;
  
  //const { mealID }= JSON.parse(event.pathParameters);
  //let mealID = event['pathParameters']['mealID'];
  //const{mealID} = event.queryStringParameters;
  const { mealID }= event.pathParameters;

  const params = {
    TableName: "meals",
    Key: {
        //'mealID': 400
        'mealID': Number(mealID)
    }
  };
  

  try {
    const data = await documentClient.delete(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 204;
  } catch(err) {
    responseBody = `Unable to delete meal: ${err}`;
    responseBody = JSON.stringify(params, null, 4);
    statusCode = 403;
  }

  const response = {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json"
      'Access-Control-Allow-Origin': '*' 
    },
    body: responseBody
  };

  return response;
};