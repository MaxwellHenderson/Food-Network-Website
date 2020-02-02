
const AWS = require('aws-sdk');

AWS.config.update({ region: "us-west-2"});

exports.handler = async (event) => {
    // TODO implement
    const ddb = new AWS.DynamoDB({apiVersion: "2012-10-08"});
    const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-west-2"});

    let responseBody = "";
    let statusCode = 0;
    
    var table = "FoodNetworkTable";
    
    //const { mealID, mealDescription, mealImagePath, mealName, mealPrice, mealQuantity, mealTags, mealIngredients, mealAllergy } = JSON.parse(event.body);
    
    var mealID = "butts";
    var mealDescription = "butts";
    var mealImagePath = "google.com";
    var mealName = "butts";
    var mealPrice = "6213.00";
    var mealQuantity = "12";
    var mealTags = "butts";
    var mealIngredients = "butts";
    var mealAllergy = "butts";
    
    
    const params = {
        TableName: "FoodNetworkTable",
        Key:{
            "userId": 1
        },
        
        // Item: {
        //   mealID: mealID,
        //   mealDescription: mealDescription,
        //   mealImagePath: mealImagePath,
        //   mealName: mealName,
        //   mealPrice: mealPrice,
        //   mealQuantity: mealQuantity,
        //   mealTags: mealTags,
        //   mealIngredients: mealIngredients,
        //   mealAllergy: mealAllergy
        // },
        
        UpdateExpression: "SET cook-book.recipes = list_append(cook-book.recipes, :item)",
        
        ExpressionAttributeValues: {
            ":item": [
                        "allergens": "None",
                        "author-name": "Jerry",
                        "datePublished": 123456,
                        "delivery-method": "pickup",
                        "description": "jesus is the one",
                        "itemId": 130,
                        "location-of-pickup": "123456 123th St SE & SE 7th Ave",
                        "post-status": "saved-active",
                        "price": "15.00",
                        "title": "stuffed peppers",
                        "type": "peskatarian"
                    
                 ]
            }
        },
        ReturnValues:"UPDATED_NEW"
    
  };
  
  documentClient.update(params, function(err, data){
      if(err) {
          console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
          console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
      }
  })
    
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
