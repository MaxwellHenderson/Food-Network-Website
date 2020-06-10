import ListingModal from "./ListingModal.js";
import CardList from "../CardList.js";
import NavBar from "./NavBar.js";
import SideBar from "./SideBar.js";
import SearchForm from "../components/search-form.jsx";
import ListingPage from "../components/ViewListingPage.js";
import NewItemPage from "./NewItemPage.js";
import sortMeals from "./SortMeals.js";
import NotificationPage from "../components/Notification/NotificationPage.js";

import React, { Component } from "react";
import $ from "jquery";
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.cities = ["All", "Bellevue", "Renton", "Issaquah", "Redmond"];

    this.sortOptions = ["Price", "Name", "Date Posted"];

    this.state = {
      user: {},
      userListings: {
        active: [],
        pending: [],
        sold: [],
      },
      selectedSortOption: this.sortOptions ? this.sortOptions[0] : "Price",
      selectedCity: this.cities ? this.cities[0] : "All",
      requestedMeal: "",
      minPrice: 0,
      maxPrice: 999,
      mealTags: [],
      minRating: 0,
      foodItems: [],
      mealIDs: [],
      currMeal: {
        mealId: 0,
        mealName: "apple",
        mealPrice: "",
        mealDescription: "",
        mealImagePath: "",
        imgAlt: "",
      },
    };
  }

  componentDidMount() {
    this.getUserInfo();
    this.getMeals();
  }

  componentDidUpdate() {
    this.renderMain();
  }

  updateSelectedCity = (city) => {
    this.setState({ selectedCity: city });
  };

  updateSortOption = (sortOption) => {
    this.setState({ selectedSortOption: sortOption });
  };

  updateRequestedRating = (rating) => {
    this.setState({ minRating: rating });
  };

  updateRequestedMeal = (mealName) => {
    this.setState({ requestedMeal: mealName });
  };

  updatePriceRange = (minPrice, maxPrice) => {
    this.setState({ minPrice: minPrice });
    this.setState({ maxPrice: maxPrice });
  };

  updateMealTags = (tags) => {
    this.setState({ mealTags: tags.map((tag) => tag.toLowerCase()) });
  };

  getUserMeals = async () => {
    const Url = "https://0o1szwcqn7.execute-api.us-west-2.amazonaws.com/max-stage/getMeals";
    const Http = new XMLHttpRequest();
    Http.open("GET", Url);
    Http.onreadystatechange = (e) => {
      console.log(Http.responseText);
    };
    return $.ajax({
      url: Url,
      type: "POST",
      dataType: "json",
      data: JSON.stringify(this.state.user.mealIDs),
      success: function (result) {
        // console.log(result);
      },
      error: function (error) {
        console.log(`Error ${error}`);
      },
    }).promise();
  };

  /* Sets filtered meal objects to foodItems */
  getMeals = async () => {
    this.getMealIDs()
      .then((mealIDs) => this.filterMeals(mealIDs))
      .then((meals) => this.setState({ foodItems: meals }))
      .then(() =>
        this.setState({
          foodItems: sortMeals(this.state.selectedSortOption, this.state.foodItems),
        })
      );
  };

  /* Returns a promise of mealIDs that are in a specified city */
  getMealIDs = async () => {
    /* Construct query string */
    const QueryString = "?city=" + this.state.selectedCity + "&minRating=" + this.state.minRating;

    const Url = "https://0o1szwcqn7.execute-api.us-west-2.amazonaws.com/max-stage/users/" + QueryString;
    const Http = new XMLHttpRequest();
    Http.open("GET", Url);
    Http.onreadystatechange = (e) => {
      console.log(Http.responseText);
    };

    /* Return promise of meal IDs */
    return $.ajax({
      url: Url,
      type: "GET",
      success: function (result) {
        // console.log(result);
      },
      error: function (error) {
        console.log(`Error ${error}`);
      },
    })
      .then((result) => {
        /* Flattens array of arrays to an array of mealIDs */
        var mealIDs = [].concat.apply(
          [],
          result.map((user) => user.mealIDs)
        );
        return mealIDs;
      })
      .promise();
  };

  /* Returns a promise of array of meal objects that meet certain criteria */
  filterMeals = async (mealIDs) => {
    /* Construct query string */
    let QueryString =
      "?mealName=" + this.state.requestedMeal + "&minPrice=" + this.state.minPrice + "&maxPrice=" + this.state.maxPrice;

    if (this.state.mealTags !== undefined && this.state.mealTags.length != 0) {
      QueryString += "&mealTags=" + JSON.stringify(this.state.mealTags);
    }

    /* Using filterMeals Lambda function */
    const Url = "https://0o1szwcqn7.execute-api.us-west-2.amazonaws.com/max-stage/filterMeals" + QueryString;
    const Http = new XMLHttpRequest();
    Http.open("GET", Url);
    Http.onreadystatechange = (e) => {
      console.log(Http.responseText);
    };

    return $.ajax({
      url: Url,
      type: "GET",
      success: function (result) {
        // console.log(result);
      },
      error: function (error) {
        console.log(`Error ${error}`);
      },
    })
      .then((meals) => {
        return meals.filter((meal) => {
          return mealIDs.includes(meal.mealID);
        });
      })
      .promise();
  };

  getUserInfo = async () => {
    const email = localStorage.getItem("email");
    this.loadUserInfo(email)
      .then((result) => {
        this.setState({ user: result.Item });
      })
      .then(() =>
        this.getUserMeals().then((meals) => {
          let activeListings = meals.filter((meal) => {
            return meal.listingStatus == "active";
          });
          let pendingListings = meals.filter((meal) => {
            return meal.listingStatus == "pending";
          });
          let soldListings = meals.filter((meal) => {
            return meal.listingStatus == "sold";
          });
          this.setState({ userListings: { active: activeListings, pending: pendingListings, sold: soldListings } });
        })
      );
  };

  loadUserInfo(email) {
    var queryString = "/user/" + email;
    var Url = "https://0o1szwcqn7.execute-api.us-west-2.amazonaws.com/pj_stage_01";
    Url = Url.concat(queryString);

    return $.ajax({
      url: Url,
      type: "GET",
      crossDomain: true,
      contentType: "application/json",
      success: function (data) {
        console.log(data);
      },
      error: function (error) {
        console.log(error);
      },
    });
  }

  setCurrentMeal(id) {
    let foodArr = this.state.foodItems;
    let meal = foodArr.find((item) => {
      return item.mealID === id;
    });
    this.setState({ currMeal: meal });
  }



  renderMain = () => {
    return (
      <React.Fragment>
        <SearchForm
          cities={this.cities}
          selectedCity={this.state.selectedCity}
          updateSelectedCity={this.updateSelectedCity}
          sortOptions={this.sortOptions}
          selectedSortOption={this.state.selectedSortOption}
          updateSortOption={this.updateSortOption}
          getMeals={this.getMeals}
          updateRequestedMeal={this.updateRequestedMeal}
          updatePriceRange={this.updatePriceRange}
          updateMealTags={this.updateMealTags}
          updateRequestedRating={this.updateRequestedRating}
        />
        <NavBar />
        <SideBar user={this.state.user} userListings={this.state.userListings} />
        <CardList foodItems={this.state.foodItems} getMealById={(id) => this.setCurrentMeal(id)} />
        <ListingModal meal={this.state.currMeal} />
      </React.Fragment>
    );
  };

  render() {
    let renderListing = () => {
      return <ListingPage meal={this.state.currMeal} user={this.state.user} />;
    };

    let renderNotifications = () => {
      return <NotificationPage user={this.state.user}/>
    }

    return (
      <Router>
        <Route exact path="/" render={this.renderMain} />
        <Route path="/listing" component={renderListing} />
        <Route path="/newItem" component={NewItemPage} />
        <Route path="/notifications" render={renderNotifications}/>
      </Router>
    );
  }
}

export default MainPage;
