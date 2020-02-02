
'use strict';
const AWS = require('aws-sdk');

AWS.config.update({ region: "us-west-2"});

exports.handler = async (event, context) => {
  const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08"});
  const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-west-2"});

  let responseBody = "";
  let statusCode = 0;

  const { username, email, password, location, hasAgreedToTerms } = JSON.parse(event.body);


  const params = {
    TableName: "User",
    Item: {
      "username": username,
      "email": email,
      "password": password,
      "location": location,
      "hasAgreedToTerms": hasAgreedToTerms
  
    }
  };
  

  try {
    const data = await documentClient.put(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 201;
  } catch (err) {
    responseBody = `Unable to put user into database`;
    console.log(params);
    statusCode = 403;
  }


  const response = {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*' 
    },
    body: responseBody
  };

  return response;
};