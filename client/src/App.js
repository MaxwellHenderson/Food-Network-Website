import React, { Component } from "react";
// import NewItemPage from "./NewItemPage.js";
import NavBar from "./NavBar.js";
import SideBar from "./SideBar.js";
import CardList from "./CardList.js";
import SortDropdown from "./component/sort-dropdown";
// import AddListingForm from "./component/form";

import $ from 'jquery';
/*
import ajax from 'ajax';
import axios from 'axios';
import jquery from 'jquery'; */
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.css";
// import NewItemPage from "./NewItemPage.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.mealNameInput = React.createRef();
    this.mealPriceInput = React.createRef();
    this.mealImagePathInput = React.createRef();

    this.sortOptions = [
      { option: "ID", sort: this.sortMealByID },
      { option: "Name", sort: this.sortMealByName },
      { option: "Price", sort: this.sortMealByPrice }
    ];

    this.state = {
      selectedSortOption: this.sortOptions ? this.sortOptions[0] : {},
      foodItems: [],
      currMeal: {mealId: 0,
                mealName: 'apple',
                mealPrice:'',
                mealDescription:'',
                mealImagePath:'',
                imgAlt:''
                } 
    };
  }

  /* Lifecycle hooks */
  componentDidMount() {
//    this.handleGetMeal();
  }



  render() {
    let meal = this.state.currMeal;

    return (
      <div className="App">
        <NavBar />
        <SideBar />
        <CardList foodItems={this.state.foodItems} getMealById={(id) => this.getMealById(id)}/>
        <SortDropdown
          selectedSortOption={this.state.selectedSortOption}
          sortOptions={this.sortOptions}
          onClick={this.handleSortOptionChange}
        />
        {/* <AddListingForm
          mealNameInput={this.mealNameInput}
          mealPriceInput={this.mealPriceInput}
          mealImagePathInput={this.mealImagePathInput}
          onClick={this.handleAddMeal}
        /> */}

        {/* <NewItemPage /> */}

        <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content" style={{'backgroundImage':  'url(' + meal.mealImagePath + ')', 'backgroundSize': '120%'}}>
              <div className="modal-body text-white px-0 py-0 w-100" style={{height: '500px', width: '500px'}} >
                <div className="modal-text mx-0 pl-3 pt-3 row d-flex align-content-between">
                  <div className="col-6">
                    <div id="modal-name" className="font-weight-light mb-1" style={{'fontSize': "20px"}}>
                      {meal.mealName}
                    </div>
                    <div id="modal-location" className="row mx-0">
                      <i className="fas fa-map-marker-alt"></i>
                      <div className="row mx-0">
                        <div className="ml-2">Seattle, WA</div> <div className="ml-2">0.8 miles</div>
                      </div>
                    </div>
                    <div id="modal-price" className="font-weight-bold">
                      Price: ${meal.mealPrice}
                    </div>
                  </div>
                  <div className="col-6 text-right">
                    <div className="mb-2">
                      Description: {meal.mealDescription}
                    </div>
                    <button className="btn btn-info">
                      View Listing
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  getMealById(id) {
    let foodArr = this.state.foodItems;
    let meal = foodArr.find((item) => {return item.mealID === id});
    this.setState({currMeal: meal});
  }

  handleGetMeal = async () => {
    const Url = "https://0o1szwcqn7.execute-api.us-west-2.amazonaws.com/max-stage/listings/";
    const Http = new XMLHttpRequest();

    Http.open("GET", Url);
    Http.onreadystatechange = (e) => {
      console.log(Http.responseText)
    }

    var that = this;
    $.ajax({
      url: Url,
      type: 'GET',
      success: function(result){
        console.log(result)
        that.setState({
          foodItems: that.state.selectedSortOption.sort(result)
        })
      },
      error: function(error){
        console.log(`Error ${error}`)
      }
    })
    };
 
  handleAddMeal = async () => { 
    const Url="https://0o1szwcqn7.execute-api.us-west-2.amazonaws.com/max-stage/listings";
    const _data={
      mealID:2800,
      mealDescription:"Caserole",
      mealImagePath:"google.com",
      mealName:"test",
      mealPrice:"60.00"
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

  handleSortOptionChange = sortOption => {
    this.setState({ selectedSortOption: sortOption });
    this.handleGetMeal();
  };

  /* Fetches our route from the Express server */
  callBackendAPI = async request => {
    const response = await fetch(request);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  sortMealByID = listings => {
    return listings.sort((meal, otherMeal) =>
      meal.mealID > otherMeal.mealID ? 1 : -1
    );
  };

  sortMealByName = listings => {
    return listings.sort((meal, otherMeal) =>
      meal.mealName.toLowerCase() > otherMeal.mealName.toLowerCase() ? 1 : -1
    );
  };

  sortMealByPrice = listings => {
    return listings.sort((meal, otherMeal) =>
      parseInt(meal.mealPrice) > parseInt(otherMeal.mealPrice) ? 1 : -1
    );
  };
}

  export default App;
