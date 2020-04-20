import React, { Component } from "react";
// import InputField from "./component/input-field";
// import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";


class ListingPage extends Component {
    render() {
        let meal = this.props.meal;
        
        return (
            <div id="viewListing" className="container w-100" style={{'margin':'10vh auto'}}>
                <div className="column border bg-light pt-2" id="photo-and-description">
                    <h2 id="title" className="mt-4 mb-2 pl-5"></h2>
                    <div className="border-top row mx-0"> 
                        <div id="image" className="column w-50 file-field">
                            <img src={meal.mealImagePath} alt={meal.imgAlt}
                                    className="my-0 mx-auto d-block" style={{'max-width': '50%'}} alt="example placeholder" />
                        </div>
                        <div id="description" className="column w-50 p-4">
                            <div className="border p-2">
                                <h3>{meal.mealName}</h3>
                                <div>
                                    {meal.mealDescription}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="tags" className="border-top px-4 row mx-0">
                        <div className="w-50">
                            <div className="my-4">
                                <div className="ml-4 text-secondary">Tags</div>
                                <div className="mx-2 border-top">
                                    <div className="mx-1">Spanish    Seafood</div>
                                </div>
                            </div>
                            <div className="my-4">
                                <div className="ml-4 text-secondary">Ingredients</div>
                                    <div className="mx-2 border-top">
                                        <div className="mx-1">Shrimp Rice Basil</div>
                                        <div className="mx-1">Vegetable Oil Sausage</div>
                                    </div>
                                </div>
                            <div className="my-4">
                                <div className="ml-4 text-secondary">Allergies</div>
                                <div className="mx-2 border-top">
                                    <div className="mx-1">Shrimp</div>
                                </div>
                            </div>
                        </div>
                        <div className="w-50 py-4">
                            <div id="purchase-form" className="border w-75 mx-auto py-2 bg-light" style={{zIndex: 1, position: 'relative', top: '-10vh'}}>
                                <div className="row mt-1 mx-0 px-3 pb-2 align-content-between">
                                    <div className="column w-50">
                                        <img src="/imgs/profile_default.jpg" className="rounded-circle" style={{height: '50px'}} alt="profile"></img>
                                        <div>John Doe</div>
                                    </div>
                                    <div className="column w-50 align-self-center">
                                        <div id="price" className="align-self-center" style={{"font-size" : '20px'}}>${meal.mealPrice} per item</div>
                                    </div>
                                </div>
                                <div className="border-top column pt-2 px-2">
                                    <div className="row mx-0 justify-content-end px-2">
                                        <div className="border py-1 px-2 w-75">
                                            <div className="text-secondary" style={{fontSize: "11px"}}>Quantity</div>
                                            <div className="ml-1" style={{fontSize: "18px"}}>2</div>
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
}

export default ListingPage;