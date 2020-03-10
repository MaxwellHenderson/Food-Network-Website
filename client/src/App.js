'use strict';

import React, { Component, useState } from "react";
import NewItemPage from "./NewItemPage.js";
import ListingPage from './ViewListingPage.js';
import ListingModal from './components/ListingModal.js';
import NavBar from "./components/NavBar.js";
import SideBar from "./SideBar.js";
import CardList from "./CardList.js";
import Login from "./components/Login/Login.js";
import SearchForm from "./component/search-form.jsx"

import $ from 'jquery';
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.css";

import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
// import { List } from "react-bootstrap/lib/Media";

import Amplify, { Auth } from 'aws-amplify';

// Manual Amplify configuration
// See https://aws-amplify.github.io/docs/js/authentication#amplify-project-setup
// for other configuration options.
Amplify.configure({
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    // identityPoolId: 'us-west-2_89J8r5C88',

    // REQUIRED - Amazon Cognito Region
    region: 'us-west-2',

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'us-west-2_89J8r5C88',

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: '6a9fkc41bp4j2r5ihu3vibm5a2',
  }
});

// You can get the current config object
const currentConfig = Auth.configure();
// let auth = new AmazonCognitoIdentity(CognitoAuth(currentConfig))

class App extends Component {
  constructor(props) {
    super(props);

    // const [isAuthenticated, userHasAuthenticated] = useState(false);

    this.mealNameInput = React.createRef();
    this.ratingInput = React.createRef();
    this.cityInput = React.createRef();

    this.sortOptions = [
      { option: "ID", sort: this.sortMealByID },
      { option: "Name", sort: this.sortMealByName },
      { option: "Price", sort: this.sortMealByPrice }
    ];

    this.state = {
      selectedSortOption: this.sortOptions ? this.sortOptions[0] : {},
      foodItems: [],
      mealIDs: [],
      currMeal: {
        mealId: 0,
        mealName: 'apple',
        mealPrice: '',
        mealDescription: '',
        mealImagePath: '',
        imgAlt: ''
      }
    };
  }


  componentDidMount() {
    this.getMealIDs();
    // this.getToken();
  }

  logIn(auth) {
    this.setState({
      currentAuth: auth
    });
    window.location.href = "/";
  }

  logOut() {
    localStorage.removeItem("token");
    console.log("LOG OUT");
    window.location.reload();
  }


  render() {
    let renderIndividualListing = () => {
      return (
        <ListingPage meal={this.state.currMeal} />
      );
    }

    let renderRoot = () => {
      //  if (this.state.currentAuth) {
      if (localStorage.getItem("token") !== null) {
        return (
          <React.Fragment>
            {/* <NavBar /> */}
            {/* <SideBar /> */}
            <SearchForm mealNameInput={this.mealNameInput} ratingInput={this.ratingInput} cityInput={this.cityInput} onClick={this.getMealIDs} />
            <CardList foodItems={this.state.foodItems} getMealById={(id) => this.setCurrentMeal(id)} />
            <ListingModal meal={this.state.currMeal} />
            <NavLink to='/'>
              <button onClick={this.logOut.bind(this)}>Log Out</button>
            </NavLink>
          </React.Fragment>
        );
      } else {
        return (
          <Login loginFunc={this.logIn.bind(this)} />
        );
      }
    }

    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path='/' component={renderRoot} />
            <Route path='/listing' render={renderIndividualListing} />
          </Switch>
        </Router>
      </div>
    );
  }

  setCurrentMeal(id) {
    let foodArr = this.state.foodItems;
    let meal = foodArr.find((item) => { return item.mealID === id });
    this.setState({ currMeal: meal });
    console.log(this.state.mealIDs);
  }

  getMealIDs = async () => {
    /* If input fields are empty, set to default values */
    const city = (this.cityInput.current.value != "") ? this.cityInput.current.value : "Renton";
    const rating = (this.ratingInput.current.value != "") ? this.ratingInput.current.value : "1";
    // const url = "/users/filter?city=" + city + "&minRating=" + rating;
    // let request = new Request(url, {
    //   method: "GET",
    //   headers: new Headers()
    // });

    // this.callBackendAPI(request)
    //   .then(result => {
    //     const mealIDs = [].concat.apply([], result.map(user => user.mealIDs))
    //     this.setState({
    //       mealIDs: mealIDs
    //     });
    //   }).then(() => this.getMeals());


    const QueryString = "?city=" + city + "&minRating=" + rating;
    const Url = "https://0o1szwcqn7.execute-api.us-west-2.amazonaws.com/max-stage/users/" + QueryString;
    const Http = new XMLHttpRequest();
    Http.open("GET", Url);
    Http.onreadystatechange = (e) => {
      console.log(Http.responseText)
    }

    var that = this;
    $.ajax({
      url: Url,
      type: 'GET',
      success: function (result) {
        const mealIDs = [].concat.apply([], result.map(user => user.mealIDs))
        that.setState({
          mealIDs: mealIDs
        })
      },
      error: function (error) {
        console.log(`Error ${error}`)
      }
    }).then(() => that.getMeals());

  };

  getMeals = async () => {
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
    }).then(meals => {
      let filteredMeals = meals.filter(meal => {
        return that.state.mealIDs.includes(meal.mealID);
      })
      that.setState({ foodItems: filteredMeals })
    })
  };



  handleAddMeal = async () => {
    const Url = "https://0o1szwcqn7.execute-api.us-west-2.amazonaws.com/max-stage/listings";

    const _data = {
      mealID: 2800,
      mealDescription: NewItemPage.state.foodDescription,
      mealImagePath: "google.com",
      mealName: NewItemPage.state.mealName,
      mealPrice: NewItemPage.state.price
    };

    $.ajax({
      url: Url,
      type: 'POST',
      dataType: 'jsonp',
      headers: {
        "accept": "application/json"
      },
      data: JSON.stringify(_data), dataType: "json",
      contentType: 'application/json; charset=utf-8',
      success: function (result) {
        console.log(result);
      },
      error: function (xhr, status, error) {
        console.log(JSON.stringify(xhr));
      }
    });
    return false;
  }

  handleSortOptionChange = sortOption => {
    this.setState({ selectedSortOption: sortOption });
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
