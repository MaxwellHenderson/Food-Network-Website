import React, { Component } from "react";
import NavBar from "./NavBar.js";
import SideBar from "./SideBar.js";
import CardList from "./CardList.js";
import SortDropdown from "./component/sort-dropdown";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.sortOptions = [
      { option: "ID", function: this.sortMealByID },
      { option: "Name", function: this.sortMealByName },
      { option: "Price", function: this.sortMealByPrice }
    ];

    this.state = {
      selectedSortOption: this.sortOptions ? this.sortOptions[1] : {},
      foodItems: [
        {
          name: "Sushi",
          imgUrl: "imgs/makisushi.jpg"
        },
        {
          name: "Pizzatime",
          imgUrl: "imgs/itsapizza.jpg"
        },
        {
          name: "Sausages",
          imgUrl: "imgs/Sausages_large.jpg"
        },
        {
          name: "Lasagna",
          imgUrl: "imgs/lasagna.jpg"
        },
        {
          name: "Mondays",
          imgUrl: "imgs/lasagna.jpg"
        },
        {
          name: "Taco Tuesday!",
          imgUrl: "imgs/tacos.jpg"
        },
        {
          name: "Mmmmmm, Ramen!",
          imgUrl: "imgs/ramen.jpg"
        },
        {
          name: "Sushi",
          imgUrl: "imgs/makisushi.jpg"
        },
        {
          name: "Not pho",
          imgUrl: "imgs/ramen.jpg"
        },
        {
          name: "Sushi",
          imgUrl: "imgs/makisushi.jpg"
        },
        {
          name: "Give me the sauce",
          imgUrl: "imgs/Sausages_large.jpg"
        },
        {
          name: "Pizza",
          imgUrl: "imgs/itsapizza.jpg"
        },
        {
          name: "Taco Tuesday!",
          imgUrl: "imgs/tacos.jpg"
        },
        {
          name: "Mmmmmm, Ramen!",
          imgUrl: "imgs/ramen.jpg"
        },
        {
          name: "Sushi",
          imgUrl: "imgs/makisushi.jpg"
        },
        {
          name: "Not pho",
          imgUrl: "imgs/ramen.jpg"
        }
      ]
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
          foodItems: this.state.selectedSortOption.function(response)
        })
      )
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
