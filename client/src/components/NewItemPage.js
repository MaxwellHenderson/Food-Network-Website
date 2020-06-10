import React, { Component } from "react";
import InputField from "./input-field";
import CurrencyInput from 'react-currency-input';
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/style.css";
import MealTags from "./MealTags";
import NavBar from "./NavBar";
import Tags from "./Tags";
import AWS from 'aws-sdk';
import $ from 'jquery';
import { v4 as uuidv4 } from 'uuid';
import { Badge, Form } from "react-bootstrap";

// var AWS = require("aws-sdk");

AWS.config.region = 'us-west-2';
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-west-2:cb1b59d8-6d8b-4d56-a187-5b91922f84d7',
});

var bucketName = "foodimagebucket";
var bucketRegion = "us-west-2";
var IdentityPoolId = "us-west-2:b8d920b2-21d8-4843-80a3-9dadec543d92";
var fileName = "";

AWS.config.update({
    region: bucketRegion,
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId
        })
});

const s3 = new AWS.S3({
    apiVersion: "2006-03-01",
    params: {Bucket: bucketName}
});

class NewItemPage extends Component {
    
    constructor(props) {
        
        super(props);

        this.state = {
            amount: 0.00,
            mealTags: [],
            ingredientTags: [],
            allergyTags: []
        };
        
        this.handleChange = this.handleChange.bind(this);

        this.mealNameInput = React.createRef();
        this.mealPriceInput = React.createRef();
        this.mealDescriptionInput = React.createRef();
        this.mealQuantityInput = React.createRef();
        this.mealTagsInput = React.createRef();
        this.mealIngredientsInput = React.createRef();
        this.mealAllergyInput = React.createRef();

        this.s3Url = '';
//
    }

    componentDidMount() {
        console.log("MOUNT");
    }

    handleChange(event, maskedvalue, floatvalue){
        this.setState({amount: maskedvalue});
    }

    render() {
        const{
            updateMealTags
        } = this.props;
        return (
            <div class="mt-2 p-4">
                <NavBar></NavBar>
                <InputField labelName="What is your meal?" placeHolder="Hamburger, Tofu, Sushi..." input={this.mealNameInput} />

                <div class="row justify-content-center p-4 border bg-light" id="photo-and-description">

                    <form class="md-form w-50 p-4">
                        <div class="file-field">
                            <div class="z-depth-1-half mb-4">
                                <img id="FoodImage" src="https://mdbootstrap.com/img/Photos/Others/placeholder.jpg" class="img-fluid"
                                    alt="example placeholder"></img>
                            </div>
                        </div>
                        <div class="d-flex justify-content-center">
                            <div class="btn btn-mdb-color btn-rounded float-left">
                                <span>Choose file</span>
                                <input type="file" id="photoFile"></input>
                            </div>
                        </div>

                        <label htmlFor="mealTags">Meal Tags:</label>
                        <Tags id="mealTags" updateMealTags={this.updateMealTags} />

                        <label htmlFor="ingredientTags">Ingredients:</label>
                        <Tags id="ingredientTags" updateMealTags={this.updateIngredientTags} />

                        <label htmlFor="allergyTags">Allergies:</label>
                        <Tags id="allergyTags" updateMealTags={this.updateAllergyTags} />

                    </form>

                    <div label="right column" class="w-50 p-4">
                        <div label="food-description">
                            <label htmlFor="foodDescriptionBox">Food Description</label>
                            <textarea class="form-control rounded-0" id="foodDescriptionBox" rows="10" ref={this.mealDescriptionInput}></textarea>
                        </div>

                        <label htmlFor="price">Price:</label>

                        <div>
                            <CurrencyInput value={this.state.amount} onChangeEvent={this.handleChange}/>
                        </div>

                        <InputField labelName="Quantity" placeHolder="" input={this.mealQuantityInput} />

                        <button class="btn btn-success mt-4" type="button" onClick={() => this.handleAddMeal()} >Submit Listing</button>
                    </div>
                </div>
            </div>
        );
    }

    handleValueChange = async(val) => {
        this.mealPriceInput.value = val;
    }


    addPhoto = async() => {
        var files = document.getElementById("photoFile").files;
        if (!files.length){
            return alert("Please choose a file to upload first.");
        }
        var file = files[0];
        fileName = file.name;

        var params = {
            Body: file,
            Bucket: bucketName,
            Key: fileName,
            // ACL: 'public-read',
        }

        s3.putObject(params, function(err, data) {
            if(err) console.log(err, err.stack); //An error occured
            else console.log(data); //Succesful upload
        })
    };

    updateMealTags = (tags) => {
        this.setState({ mealTags: tags.map((tag) => tag.toLowerCase()) });
    };
    updateIngredientTags = (tags) => {
        this.setState({ ingredientTags: tags.map((tag) => tag.toLowerCase()) });
    };
    updateAllergyTags = (tags) => {
        this.setState({ allergyTags: tags.map((tag) => tag.toLowerCase()) });
    };

    handleAddMeal = async () => {
        
        var testID = uuidv4();
        console.log(testID);

        var fileUrl = this.addPhoto();
        
        var email = localStorage.getItem("email");
        console.log(email);

        const mealUrl =
            "https://0o1szwcqn7.execute-api.us-west-2.amazonaws.com/max-stage/listings";

        const userUrl = 
            "https://0o1szwcqn7.execute-api.us-west-2.amazonaws.com/max-stage/user";


        const _data = {
            mealID: testID,
            mealDescription: this.mealDescriptionInput.current.value,
            mealImagePath: "https://"+bucketName+".s3-us-west-2.amazonaws.com/"+fileName,
            mealName: this.mealNameInput.current.value,
            mealPrice: this.state.amount,
            mealQuantity: this.mealQuantityInput.current.value,
            mealTags: this.state.mealTags,
            mealIngredients: this.state.ingredientTags,
            mealAllergy: this.state.allergyTags,
            userEmail: localStorage.getItem("email")
        };

        const _data2 = {
            mealID: testID,
            userEmail: localStorage.getItem("email")
        };


        console.log("The value of _data:\n"+JSON.stringify(_data));
        console.log("The value of _data2:\n"+JSON.stringify(_data2));
        //Puts the meal information into the database
        $.ajax({
            url: mealUrl,
            type: "POST",
            // dataType: "jsonp",
            headers: {
                accept: "application/json",
            },
            crossDomain: true,
            data: JSON.stringify(_data),
            // dataType: "json",
            // contentType: "application/json; charset=utf-8",
            success: function (result) {
                console.log("Meal table MealPut success\n")
                console.log(result);
            },
            error: function (xhr, status, error) {
                console.log("Meal table MealPut failure");
                console.log(JSON.stringify(xhr));
            }
        });

        $.ajax({
            url: userUrl,
            type: "PUT",
            dataType: "jsonp",
            headers: {
                accept: "application/json",
            },
            crossDomain: true,
            data: JSON.stringify(_data2),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                console.log("User table MealPut success\n")
                console.log(result);
            },
            error: function (xhr, status, error) {
                console.log("User table MealPut failure");
                console.log(JSON.stringify(xhr));
            }
        });

        return false;
    };

}

export default NewItemPage;