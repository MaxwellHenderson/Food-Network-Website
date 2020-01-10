import React, { Component } from "react";
import NavBar from "./NavBar.js";
import SideBar from "./SideBar.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.css";

class NewItemPage extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return(
            <div class="app p-4">
                <div class="form-group">
                    <label for="title-input" >What is your meal?</label>
                    <input type="text" class="form-control" id="title-input" placeholder="ex Hamburger, Tofu, Sushi..."></input>
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
                            <label for="foodTagsBox">Tags:</label>
                            <input type="text" class="form-control" id="foodTagsBox" placeholder="Seafood, Spanish..."></input>
                        </div>
                        <div label="ingredients">
                            <label for="ingredientsField">Ingredients:</label>
                            <input type="text" class="form-control" id="ingredientsField" placeholder=""></input>
                        </div>
                        <div label="allergy-info">
                            <label for="allergyBox">Tags:</label>
                            <input type="text" class="form-control" id="allergyBox" placeholder="Peanuts, Milk..."></input>
                        </div>
                    </form>
                </div>
                
                <div label="right column" class="w-50 p-4">
                    <div label="food-description">
                        <label for="foodDescriptionBox">Food Description</label>
                        <textarea class="form-control rounded-0" id="foodDescriptionBox" rows="10"></textarea>
                    </div>

                    <label for="price">Price:</label>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">$</span>
                        </div>
                        <input type="text" class="form-control" aria-label="Amount"></input>
                    </div>
                    <label for="quantity">Quantity:</label>
                    <input type="text" class="form-control"></input>

                    <button class="btn btn-success mt-4" type="button">Submit Listing</button>

                </div>
            </div>
        );
    }
}

export default NewItemPage;