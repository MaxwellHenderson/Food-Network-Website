import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/navbar";
import Listings from "./components/listings";
import Form from "./components/form";
import SortDropdown from "./components/sort-dropdown";

class App extends Component {
  constructor() {
    super();
    this.addMealInput = React.createRef();
    this.updateMealInput = React.createRef();
    this.sortOptions = [
      { name: "Meal ID", function: this.sortMealByID },
      { name: "Meal Name", function: this.sortMealByName }
    ];
    this.state = {
      listings: [],
      mostRecentListing: {},
      selectedMealID: 1,
      selectedSortOption: this.sortOptions ? this.sortOptions[0] : {}
    };
  }

  /* Lifecycle hooks */
  componentDidMount() {
    this.handleGetMeal();
  }

  componentDidUpdate() {
    // this.handleGetMeal();
  }

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Form
          labelName="Meal Name"
          textInput={this.addMealInput}
          buttonName="Add Meal"
          onClick={this.handleAddMeal}
        />
        <Form
          labelName="New Meal Name"
          textInput={this.updateMealInput}
          buttonName="Update Meal"
          onClick={this.handleUpdateMeal}
        />
        <input
          type="button"
          value="Purchase Meal"
          onClick={this.handleDeleteMeal}
        />
        <SortDropdown
          selectedSortOption={this.state.selectedSortOption}
          sortOptions={this.sortOptions}
          onClick={this.handleSortOptionChange}
        />
        <Listings
          listings={this.state.listings}
          mostRecentListing={this.state.mostRecentListing}
          isChecked={this.handleOptionChecked}
          onChange={this.handleOptionChange}
        />
      </React.Fragment>
    );
  }

  /* Fetches our route from the Express server */
  callBackendAPI = async request => {
    const response = await fetch(request);
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  handleOptionChecked = mealID => {
    return this.state.selectedMealID === mealID;
  };

  handleOptionChange = changeEvent => {
    this.setState({
      selectedMealID: parseInt(changeEvent.target.value)
    });
  };

  handleSortOptionChange = sortOption => {
    this.setState({ selectedSortOption: sortOption });
    this.handleGetMeal();
  };

  handleGetMeal = async () => {
    const url = "/listings";
    let request = new Request(url, {
      method: "GET",
      headers: new Headers()
    });
    this.displayMeals(request);
  };

  handleAddMeal = async () => {
    const url = "/listings";
    const request = new Request(url, {
      method: "POST",
      /* Important to serialize data before sending the request */
      body: JSON.stringify({ mealName: this.addMealInput.current.value }),
      /* Need to specify what data is stored in the body. In this case it's a JSON */
      headers: { "Content-Type": "application/json" }
    });
    this.callBackendAPI(request)
      .then(res => {
        this.setState({
          listings: this.state.selectedSortOption.function([
            ...this.state.listings,
            res
          ]),
          mostRecentListing: res
        });
      })
      .catch(err => console.log(err));
  };

  handleUpdateMeal = async () => {
    const url = `/listings/${String(this.state.selectedMealID)}`;
    const request = new Request(url, {
      method: "PUT",
      body: JSON.stringify({ mealName: this.updateMealInput.current.value }),
      headers: { "Content-Type": "application/json" }
    });
    this.displayMeals(request);
  };

  handleDeleteMeal = async () => {
    const url = `/listings/${String(this.state.selectedMealID)}`;
    const request = new Request(url, {
      method: "DELETE"
    });
    this.displayMeals(request);
  };

  displayMeals = request => {
    this.callBackendAPI(request)
      .then(res =>
        this.setState({ listings: this.state.selectedSortOption.function(res) })
      )
      .catch(err => console.log(err));
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
}

export default App;
