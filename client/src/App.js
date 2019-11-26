import React, { Component } from "react";
import NavBar from "./NavBar.js";
import SideBar from "./SideBar.js";
import CardList from "./CardList.js";
import SortDropdown from "./component/sort-dropdown";
import AddListingForm from "./component/form";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.css";

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
      foodItems: []
    };
  }

  /* Lifecycle hooks */
  componentDidMount() {
    this.handleGetMeal();
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <SideBar />
        <CardList foodItems={this.state.foodItems} />
        <SortDropdown
          selectedSortOption={this.state.selectedSortOption}
          sortOptions={this.sortOptions}
          onClick={this.handleSortOptionChange}
        />
        <AddListingForm
          mealNameInput={this.mealNameInput}
          mealPriceInput={this.mealPriceInput}
          mealImagePathInput={this.mealImagePathInput}
          onClick={this.handleAddMeal}
        />
      </div>
    );
  }

  handleGetMeal = async () => {
    const url = "/listings";
    let request = new Request(url, {
      method: "GET",
      headers: new Headers()
    });
    this.callBackendAPI(request)
      .then(response =>
        this.setState({
          foodItems: this.state.selectedSortOption.sort(response)
        })
      )
      .catch(err => console.log(err));
  };

  handleAddMeal = async () => {
    const url = "/listings";
    const request = new Request(url, {
      method: "POST",
      /* Important to serialize data before sending the request */
      body: JSON.stringify({
        mealName: this.mealNameInput.current.value,
        mealPrice: this.mealPriceInput.current.value,
        mealImagePath: this.mealImagePathInput.current.value
      }),
      /* Need to specify what data is stored in the body. In this case it's a JSON */
      headers: { "Content-Type": "application/json" }
    });
    console.log(request);
    this.callBackendAPI(request)
      .then(res => {
        this.setState({
          foodItems: this.state.selectedSortOption.function([
            ...this.state.foodItems,
            res
          ])
        });
      })
      .catch(err => console.log(err));
  };

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
