what to pass into props -please use following naming convention:

//User object containing the buyer's information
var userObj={
    email,
    rating,
    city,
    username,
    imgsrc,
    mealIDs
}

//map datastructure of sellers and their meals
var sellerMap={
    email(sellerId): mealObj
}

//mealObj contains the following information -you do not need to follow this naming convention:
var mealObj={
    mealID,
    mealName,
    mealPrice,
    mealDescription,
    mealImagePath,
    mealTag
}