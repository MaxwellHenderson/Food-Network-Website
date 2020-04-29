'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient();

    let responseBody = "";
    let statusCode = 0;
    
    const city = (event['queryStringParameters']['city']) ? event['queryStringParameters']['city'] : "All";
    const minRating = (event['queryStringParameters']['minRating']) ? Number(event['queryStringParameters']['minRating']) : 0;
    
    try{
        let params ={};
        let data = {};
        if(city === "All"){
            params = {
                TableName: "Users",
                ExpressionAttributeValues: {
                    ":minRating": minRating
                },
                FilterExpression : "rating >= :minRating"
            };
            data = await documentClient.scan(params).promise();
        }
        else{
            params = {
                TableName: "Users",
                IndexName: "city-index",
                KeyConditionExpression: "city = :city",
                ExpressionAttributeValues: {
                    ":city": city,
                    ":minRating": minRating
                },
                FilterExpression : "rating >= :minRating"
            };
            data = await documentClient.query(params).promise();
        }
        
        responseBody = JSON.stringify(data.Items);
        statusCode = 200; //success
    }catch(err){
        responseBody = 'Unable to get product: ${err}';
        statusCode = 403; //failure
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
