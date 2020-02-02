'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient();

    let responseBody = "";
    let statusCode = 0;

    //object to send into documentClient.PUT
    //hardcode for now
    const params = {
        TableName: "meals"
    };
    try{
        //get data from put operation
        const data = await documentClient.scan(params).promise();
        //store data into var
        responseBody = JSON.stringify(data.Items);//dealing with multiple items
        statusCode = 200; //success
    }catch(err){
        responseBody = 'Unable to get product: ${err}';
        statusCode = 403; //failure
    }
    //response object
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