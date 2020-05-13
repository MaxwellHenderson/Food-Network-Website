import ListingModal from './ListingModal.js';
import CardList from "../CardList.js";
import NavBar from "./NavBar.js";
import SideBar from "./SideBar.js";
import SearchForm from "../components/search-form.jsx";
import ListingPage from "../components/ViewListingPage.js";
import NewItemPage from './NewItemPage.js';

import React, { Component } from "react";
import $ from 'jquery';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import ProfilePage from './Profile/ProfilePage.js';

class MainPage extends Component {
  constructor(props) {
    super(props);

    this.mealNameInput = React.createRef();
    this.minPriceInput = React.createRef();
    this.maxPriceInput = React.createRef();
    this.ratingInput = React.createRef();
    this.cityInput = React.createRef();
    this.cities = ["All", "Renton", "Issaquah", "Redmond"];

    this.sortOptions = [
      { option: "ID", sort: this.sortMealByID },
      { option: "Name", sort: this.sortMealByName },
      { option: "Price", sort: this.sortMealByPrice }
    ];

    this.state = {
      selectedSortOption: this.sortOptions ? this.sortOptions[0] : {},
      selectedCity: this.cities ? this.cities[0] : 'City',
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
    this.getMeals();
  }

  componentDidUpdate() {
    this.renderMain();
  }


  handleSelectCity = city => {
    this.setState({ selectedCity: city });
  }

  handleSortOptionChange = sortOption => {
    this.setState({ selectedSortOption: sortOption });
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

  // NEED IMPORT AUTH ANS AWS4 FROM AMPLIFY
  // handleGetMeal = async () => {
  //     const Url = "https://0o1szwcqn7.execute-api.us-west-2.amazonaws.com/max-stage/listings/";
  //     const Url = "https://0o1szwcqn7.execute-api.us-west-2.amazonaws.com/stage-1/listings/";
  //     const Http = new XMLHttpRequest();

  //     Http.open("GET", Url);
  //     Http.onreadystatechange = (e) => {
  //       console.log(Http.responseText)
  //     }

  //     const opts = {
  //       method: "GET",
  //       service: "execute-api",
  //       region: "us-west-2",
  //       path: "/listings",
  //       url: "https://0o1szwcqn7.execute-api.us-west-2.amazonaws.com/stage-1/listings/"
  //     };


  //     var that = this;
  //     const credentials = await Auth.currentCredentials();
  //     const { accessKeyId, secretAccessKey, sessionToken } = credentials;
  //     const request = aws4.sign(opts.url, {
  //       accessKeyId,
  //       secretAccessKey,
  //       sessionToken
  //     });
  //     $.ajax({
  //       url: Url,
  //       type: 'GET',
  //       url: opts.url,
  //       headers: request.headers,
  //       success: function(result){
  //         // console.log(result)
  //         that.setState({
  //           foodItems: that.state.selectedSortOption.sort(result)
  //         })
  //       },
  //       error: function(error){
  //         console.log(`Error ${error}`)
  //         console.log(`Error ${error.responseText}`)
  //       }
  //     })
  // };

  /* Sets filtered meal objects to foodItems */
  getMeals = async () => {
    this.getMealIDs()
      .then(mealIDs => this.filterMeals(mealIDs))
      .then(meals => this.setState({ foodItems: meals }))
  }

  /* Returns a promise of mealIDs that are in a specified city */
  getMealIDs = async () => {
    /* Construct query string */
    const QueryString = "?city=" + this.state.selectedCity;

    const Url = "https://0o1szwcqn7.execute-api.us-west-2.amazonaws.com/max-stage/users/" + QueryString;
    const Http = new XMLHttpRequest();
    Http.open("GET", Url);
    Http.onreadystatechange = (e) => {
      console.log(Http.responseText)
    }

    /* Return promise of meal IDs */
    return $.ajax({
      url: Url,
      type: 'GET',
      success: function (result) {
        // console.log(result);
      },
      error: function (error) {
        console.log(`Error ${error}`)
      }
    }).then(result => {
      /* Flattens array of arrays to an array of mealIDs */
      var mealIDs = [].concat.apply([], result.map(user => user.mealIDs));
      return mealIDs;
    }).promise();
  };

  /* Returns a promise of array of meal objects that meet certain criteria */
  filterMeals = async (mealIDs) => {
    /* Construct query string */
    const QueryString = "?mealName=" + this.mealNameInput.current.value
      + "&minPrice=" + this.minPriceInput.current.value
      + "&maxPrice=" + this.maxPriceInput.current.value;

    /* Using filterMeals Lambda function */
    const Url = "https://0o1szwcqn7.execute-api.us-west-2.amazonaws.com/max-stage/filterMeals" + QueryString;
    const Http = new XMLHttpRequest();
    Http.open("GET", Url);
    Http.onreadystatechange = (e) => {
      console.log(Http.responseText)
    }

    return $.ajax({
      url: Url,
      type: 'GET',
      success: function (result) {
        // console.log(result);
      },
      error: function (error) {
        console.log(`Error ${error}`)
      }
    }).then(meals => {
      return meals.filter(meal => {
        return mealIDs.includes(meal.mealID);
      })
    }).promise();
  };

    setCurrentMeal(id) {
        let foodArr = this.state.foodItems;
        let meal = foodArr.find((item) => { return item.mealID === id });
        this.setState({ currMeal: meal });
        console.log(this.state.mealIDs);
    }

    logOut() {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      window.location.reload();
    }
    
    renderMain = () => {
        return (
            <React.Fragment>
                <SearchForm
                    mealNameInput={this.mealNameInput}
                    minPriceInput={this.minPriceInput}
                    maxPriceInput={this.maxPriceInput}
                    cities={this.cities}
                    selectedCity={this.state.selectedCity}
                    onSelect={this.handleSelectCity}
                    onClick={this.getMeals} />
                <NavBar /> 
                <SideBar />
                <CardList foodItems={this.state.foodItems} getMealById={(id) => this.setCurrentMeal(id)} />
                <ListingModal meal={this.state.currMeal} />
                <button onClick={this.logOut}>Log Out</button>
            </React.Fragment>
        );
    }

    render() {
        let renderListing = () => {
            return (
                <ListingPage meal={this.state.currMeal} />
            );
        }
        
        return (
            <Router>
                <Route exact path='/' render={this.renderMain} />
                <Route path = '/listing' component={renderListing} />
                <Route path='/newItem' component={NewItemPage} />
                <Route path='/profile/:user' component={ProfilePage} />
            </Router>
        );
    }
}

export default MainPage;