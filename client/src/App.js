'use strict';

import React, { Component } from "react";
import NewItemPage from "./NewItemPage.js";
import ListingPage from './ViewListingPage.js';
import ListingModal from './components/ListingModal.js';
import NavBar from "./components/NavBar.js";
import SideBar from "./SideBar.js";
import CardList from "./CardList.js";
import Login from "./components/Login/Login.js";

import $ from 'jquery';
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.css";

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import { List } from "react-bootstrap/lib/Media";

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
      currMeal: {
                  mealId: 0,
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
   this.handleGetMeal();
  }


  render() {
    let renderListingsView = () => {
      return (
        <React.Fragment>
            <CardList foodItems={this.state.foodItems} getMealById={(id) => this.setCurrentMeal(id)}/>
            <ListingModal meal={this.state.currMeal}/>
        </React.Fragment>
      );
    };

    let renderIndividualListing = () => {
      return (
        <ListingPage meal={this.state.currMeal}/>
      );
    }

    let renderRoot = () => {
      if (this.state.user) {
        return (
          <React.Fragment>
            <CardList foodItems={this.satate.foodItems} getMealByID={(id) => this.setCurrentMeal(id)} />
            <ListingModal meal={this.state.currMeal} />
          </React.Fragment>
        );
      } else {
        return (
          <Login login={this.state.user}/>
        );
      }
    }

    return (
      <div className="App">
        <Router>
          <NavBar />
          {/* <SideBar /> */}
          <Switch>
            {/* <Route exact path='/' render={renderListingsView} /> */}
            <Route exact path='/' component={renderRoot} />
            <Route path='/listing' render={renderIndividualListing} />

          </Switch>
        </Router>
        {/* <SortDropdown
          selectedSortOption={this.state.selectedSortOption}
          sortOptions={this.sortOptions}
          onClick={this.handleSortOptionChange}
        /> */}
        {/* <AddListingForm
          mealNameInput={this.mealNameInput}
          mealPriceInput={this.mealPriceInput}
          mealImagePathInput={this.mealImagePathInput}
          onClick={this.handleAddMeal}
        /> */}
      </div>
    );
  }

  setCurrentMeal(id) {
    let foodArr = this.state.foodItems;
    let meal = foodArr.find((item) => {return item.mealID === id});
    this.setState({currMeal: meal});
    console.log(this.state.currMeal);
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
      mealDescription: NewItemPage.state.foodDescription,
      mealImagePath:"google.com",
      mealName: NewItemPage.state.mealName,
      mealPrice: NewItemPage.state.price
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
