'use strict';
const AWS = require('aws-sdk');

AWS.config.update({ region: "us-west-2"});

exports.handler = async (event, context) => {
  const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08"});
  const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-west-2"});

  let responseBody = "";
  let statusCode = 0;

  const { email, password} = event.queryStringParameters;
  //let email = "pj@gmail.com";
  //let password = "Iamtheoverlord";

  const params = {
    TableName : "User",
    ProjectionExpression:"#email, #password",
    KeyConditionExpression: "#email = :email and #password = :password",
    ExpressionAttributeNames:{
        "#email": "email",
        "#password": "password"
    },
    ExpressionAttributeValues: {
        ":email": email,
        ":password": password
    }
  };

  try {
    const data = await documentClient.query(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 200;
  } catch (err) {
    responseBody = JSON.stringify(err);
    statusCode = 403;
  }

  const response = {
    statusCode: statusCode,
    headers: {
      "myHeader": "test"
    },
    body: responseBody
  };

  return response;
};