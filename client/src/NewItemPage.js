import React, { Component } from "react";
import { Button } from "react-bootstrap";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.css";

class NewItemPage extends Component {
    constructor(props) {
        super(props);

        this.mealNameInput = React.createRef();
        this.mealPriceInput = React.createRef();
        this.mealDescriptionInput = React.createRef();

    }

    render() {
        return (
            <div class=" p-4">
                <div class="form-group">
                    <label for="title-input" >What is your meal?</label>
                    <input type="text" class="form-control" id="title-input" placeholder="ex Hamburger, Tofu, Sushi..." ref={this.mealNameInput}></input>
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

                    <div label="right column" class="w-50 p-4">
                        <div label="food-description">
                            <label for="foodDescriptionBox">Food Description</label>
                            <textarea class="form-control rounded-0" id="foodDescriptionBox" rows="10" ref={this.mealDescriptionInput}></textarea>
                        </div>

                        <label for="price">Price:</label>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">$</span>
                            </div>
                            <input type="text" class="form-control" aria-label="Amount" ref={this.mealPriceInput}></input>
                        </div>
                        <label for="quantity">Quantity:</label>
                        <input type="text" class="form-control"></input>

                        {/* <button class="btn btn-success mt-4" type="button">Submit Listing</button> */}
                        <Button variant="primary" type="button" onClick={() => this.handleAddMeal()}>
                            Submit Listing
                        </Button>
                    </div>
                </div>
            </div>
        );
    }


    handleAddMeal = async () => {
        const Url =
            "https://0o1szwcqn7.execute-api.us-west-2.amazonaws.com/max-stage/listings";
        const _data = {
            mealID: 2824,
            mealDescription: this.mealDescriptionInput.current.value,
            mealImagePath: "google.com",
            mealName: this.mealNameInput.current.value,
            mealPrice: this.mealPriceInput.current.value
        };

        $.ajax({
            url: Url,
            type: "POST",
            dataType: "jsonp",
            headers: {
                accept: "application/json"
            },
            data: JSON.stringify(_data),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                console.log(result);
            },
            error: function (xhr, status, error) {
                console.log(JSON.stringify(xhr));
            }
        });
        return false;
    };

}

export default NewItemPage;