import React, { Component } from "react";
import InputField from "./component/input-field";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.css";


class ListingPage extends Component {
    constructor(props) {
        super(props);

        this.mealNameInput = React.createRef();
        this.mealPriceInput = React.createRef();
        this.mealDescriptionInput = React.createRef();
        this.mealQuantityInput = React.createRef();
        this.mealTagsInput = React.createRef();
        this.mealIngredientsInput = React.createRef();
        this.mealAllergyInput = React.createRef();

    }

    render() {
        return (
            <div id="viewListing" className="container h-100" style={{'margin': '100px 10%'}}>
                <div className="column border bg-light pt-2" id="photo-and-description">
                    <h2 id="title" className="mt-4 mb-2 pl-5">Shrimp Rice</h2>
                    <div className="border-top row mx-0"> 
                        <div id="image" className="column w-50 file-field">
                            <img src="https://www.lecremedelacrumb.com/wp-content/uploads/2019/05/one-pan-spanish-shrimp-rice-1.jpg" 
                                    className="my-0 mx-auto d-block" style={{'max-width': '50%'}} alt="example placeholder" />
                        </div>
                        <div id="description" className="column w-50 p-4">
                            <div className="border p-2">
                                <h3>Description</h3>
                                <div>
                                    Lorem ipsum dolor sit amet, consectetur 
                                    adipiscing elit, sed do eiusmod tempor 
                                    incididunt ut labore et dolore magna aliqua. Ut
                                    enim ad minim veniam, quis nostrud 
                                    exercitation ullamco laboris nisi ut 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="tags" className="border-top px-4 row mx-0">
                        <div className="w-50">
                            <div className="my-4">
                                <InputField labelName="Tags" 
                                    placeHolder="Seafood, Spanish..." input={this.mealTagsInput} />
                            </div>
                            <div className="my-4">
                                <InputField labelName="Ingredients" 
                                    placeHolder="" input={this.mealIngredientsInput} />
                            </div>
                            <div className="my-4">
                                <InputField labelName="Allergy" 
                                    placeHolder="Peanuts, Milk..." input={this.mealAllergyInput} />
                            </div>
                        </div>
                        <div className="w-50 py-4">
                            <div id="purchase-form" className="border w-50 mx-auto py-3">
                                <div className="row mt-1 mx-0">
                                    <div className="column">
                                        <img src=""></img>
                                        <div>John Doe</div>
                                    </div>
                                    <div className="column">

                                    </div>
                                </div>
                                <div className="border-top column pt-2 px-2">
                                    <div className="row mx-0 justify-content-end px-4">
                                        <div className="border">
                                            <div>Quantity</div>
                                            <div>2</div>
                                        </div>
                                    </div>
                                    <div className="row mx-0 mt-2">
                                        <button className="btn btn-secondary mx-auto w-75">Message Seller</button>
                                    </div>
                                    <div className="row mx-0 mt-2">
                                        <button className="btn btn-primary mx-auto w-75">Request Purchase</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    handleAddMeal = async () => {
        const Url =
            "https://0o1szwcqn7.execute-api.us-west-2.amazonaws.com/max-stage/listings";
        const _data = {
            mealID: 2833,
            mealDescription: this.mealDescriptionInput.current.value,
            mealImagePath: "google.com",
            mealName: this.mealNameInput.current.value,
            mealPrice: this.mealPriceInput.current.value,
            mealQuantity: this.mealQuantityInput.current.value,
            mealTags: this.mealTagsInput.current.value,
            mealIngredients: this.mealIngredientsInput.current.value,
            mealAllergy: this.mealAllergyInput.current.value
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

export default ListingPage;