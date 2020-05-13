'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient();

    let responseBody = "";
    let statusCode = 0;
    const mealName = event['queryStringParameters']['mealName'];
    const minPrice = (event['queryStringParameters']['minPrice']) ? Number(event['queryStringParameters']['minPrice']) : 1;
    const maxPrice = (event['queryStringParameters']['maxPrice']) ? Number(event['queryStringParameters']['maxPrice']) : 999;
    const listingStatus = "Active";
    const mealTag = (event['queryStringParameters']['mealTag']) ? event['queryStringParameters']['mealTag'] : null;
    let params ={};
    let expressionAttribute = {};
    let filterExpression = "";
    
    if(mealName && mealTag){
        expressionAttribute = {
            ":mealName": mealName,
            ":mealTag": mealTag,
            ":minPrice": minPrice,
            ":maxPrice": maxPrice,
            ":listingStatus": listingStatus
        };
        filterExpression = "contains(mealTags, :mealTag) AND mealName = :mealName AND mealPrice BETWEEN :minPrice AND :maxPrice";
        
    }
    else if(mealName){
        expressionAttribute = {
            ":mealName": mealName,
            ":minPrice": minPrice,
            ":maxPrice": maxPrice,
            ":listingStatus": listingStatus
        };
        filterExpression = "mealName = :mealName AND mealPrice BETWEEN :minPrice AND :maxPrice";
    }
    else if(mealTag){
        expressionAttribute = {
            ":mealTag": mealTag,
            ":minPrice": minPrice,
            ":maxPrice": maxPrice,
            ":listingStatus": listingStatus
        };
        filterExpression = "contains(mealTags, :mealTag) AND mealPrice BETWEEN :minPrice AND :maxPrice";
    }
    else{
        expressionAttribute = {
            ":minPrice": minPrice,
            ":maxPrice": maxPrice,
            ":listingStatus": listingStatus,
        };
        filterExpression = "mealPrice BETWEEN :minPrice AND :maxPrice";
    }
    
    params = {
        TableName: "Meals",
        IndexName: "listingStatus-index",
        KeyConditionExpression: "listingStatus = :listingStatus",
        ExpressionAttributeValues: expressionAttribute,
        FilterExpression: filterExpression
    };

    
    try{
        //get data from put operation
        const data = await documentClient.query(params).promise();
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
