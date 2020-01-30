import React, { Component } from "react";
import NavBar from "./NavBar.js";
import SideBar from "./SideBar.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.css";
import $ from 'jquery';


class NewItemPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            mealName: '',
            cuisineType: '',
            ingredients: '',
            allergyTags: '',
            foodDescription: '',
            price: '',
            quantity: '',
        }
    }

    handleAddMeal = async () => { 
        const Url="https://0o1szwcqn7.execute-api.us-west-2.amazonaws.com/max-stage/listings";
        
        const _data={
          mealID:3800,
          mealDescription: this.state.foodDescription,
          mealImagePath:"google.com",
          mealName: this.state.mealName,
          mealPrice: this.state.price
        };
        
        $.ajax({
          url: Url,
          type: 'POST',
          dataType: 'jsonp',
          headers: {
            "accept" : "application/json"
          }, 
          data: JSON.stringify(_data), dataType: "json",
          contentType: 'application/json; charset=utf-8',
          success: function(result) {
            console.log(result);
          }, 
          error:function(xhr, status, error) {
            console.log(JSON.stringify(xhr)); 
          }
        });
        return false;
      }

    changeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        console.log("We are changing "+nam+" to "+val);
        this.setState({[nam]: val});
    }

    render() {
        return(
            <div class=" p-4">
                <div class="form-group">
                    <label for="title-input" >What is your meal?</label>
                    <input type="text" class="form-control" id="title-input" name="mealName" placeholder="ex Hamburger, Tofu, Sushi..." onChange = {this.changeHandler}></input>
                </div>

                <div class="row justify-content-center p-4 border bg-light" id="photo-and-description">
                    <form class="md-form w-50 p-4">
                        <div class="file-field">
                            <div class="z-depth-1-half mb-4">
                                <img src="https://mdbootstrap.com/img/Photos/Others/placeholder.jpg" class="img-fluid"
                                alt="example placeholder"></img>
                            </div>
                        </div>
                        <div class="d-flex justify-content-center">
                            <div class="btn btn-mdb-color btn-rounded float-left">
                                <span>Choose file</span>
                                <input type="file"></input>
                            </div>
                        </div>
                        <div label="food-tags">
                            <label for="foodTagsBox">Cuisine:</label>
                            <input type="text" class="form-control" name="cuisineType" id="foodTagsBox" placeholder="Seafood, Spanish..." onChange = {this.changeHandler}></input>
                        </div>
                        <div label="ingredients">
                            <label for="ingredientsField">Ingredients:</label>
                            <input type="text" class="form-control" name="ingredients" id="ingredientsField" placeholder="" onChange = {this.changeHandler}></input>
                        </div>
                        <div label="allergy-info">
                            <label for="allergyBox">Allergy Tags:</label>
                            <input type="text" class="form-control" name="allergyTags" id="allergyBox" placeholder="Peanuts, Milk..." onChange = {this.changeHandler}></input>
                        </div>
                    </form>
                
                <div label="right column" class="w-50 p-4">
                    <div label="food-description">
                        <label for="foodDescriptionBox">Food Description</label>
                        <textarea class="form-control rounded-0" name="foodDescription" id="foodDescriptionBox" rows="10" onChange = {this.changeHandler}></textarea>
                    </div>

                    <label for="price">Price:</label>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">$</span>
                        </div>
                        <input type="text" class="form-control" name="price" aria-label="Amount" onChange = {this.changeHandler}></input>
                    </div>
                    <label for="quantity">Quantity:</label>
                    <input type="text" name="quantity" class="form-control" onChange = {this.changeHandler}></input>

                    <button class="btn btn-success mt-4" type="button" onClick={this.handleAddMeal}>Submit Listing</button>
                </div>
            </div>
                </div>
        );
    }
}

export default NewItemPage;