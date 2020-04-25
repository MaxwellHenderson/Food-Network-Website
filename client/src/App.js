import React, { Component } from "react";
import NewItemPage from "./components/NewItemPage.js";
import Login from "./components/Login/Login.js";
<<<<<<< HEAD
import SearchForm from "./component/search-form.jsx"
=======
import MainPage from "./components/MainPage.js";
>>>>>>> ad92a64ea17727293ce0e700fd8c8c22cd7716f7

import $ from 'jquery';
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.css";

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Amplify, { Auth } from 'aws-amplify';

// Manual Amplify configuration
// See https://aws-amplify.github.io/docs/js/authentication#amplify-project-setup
// for other configuration options.
Amplify.configure({
  Auth: {
<<<<<<< HEAD
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    // identityPoolId: 'us-west-2_89J8r5C88',

    // REQUIRED - Amazon Cognito Region
    region: 'us-west-2',

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'us-west-2_89J8r5C88',

=======
      // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
      identityPoolId: 'us-west-2:4809a3a5-d7b3-436a-9030-4ec877205e7a',
      
      // REQUIRED - Amazon Cognito Region
      region: 'us-west-2',

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'us-west-2_89J8r5C88',

>>>>>>> ad92a64ea17727293ce0e700fd8c8c22cd7716f7
    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: '6a9fkc41bp4j2r5ihu3vibm5a2',
  }
});

// You can get the current config object
// const currentConfig = Auth.configure();
// let auth = new AmazonCognitoIdentity(CognitoAuth(currentConfig))

class App extends Component {
<<<<<<< HEAD
  constructor(props) {
    super(props);

    // const [isAuthenticated, userHasAuthenticated] = useState(false);

    this.mealNameInput = React.createRef();
    this.minPriceInput = React.createRef();
    this.maxPriceInput = React.createRef();
    this.cities = ["Renton", "Issaquah", "Redmond"];

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
    // this.getUserMeals();
    this.getMeals();
    // this.getToken();
  }


  // async getToken() {
  //   try {
  //       const user = await Auth.signIn(this.state.email, this.state.password);
  //       // console.log(user);
  //       console.log("Hurray, I am successfully authenticated~!");

  //       const auth = await Auth.currentSession();
  //       // const auth = await Auth.currentAuthenticatedUser();
  //       console.log(auth.idToken.jwtToken);
  //       this.props.loginFunc(auth);
  //   } catch(error) {
  //       console.log(error);
  //       // prompt user to try again
  //   }
  // }
  // REEE
  logIn(auth) {
    this.setState({
      currentAuth: auth
    });
  }

  logOut() {
    localStorage.setItem("token", null);
    console.log(localStorage.getItem("token"));
    console.log("LOG OUT");
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
            <SearchForm
              mealNameInput={this.mealNameInput}
              minPriceInput={this.minPriceInput}
              maxPriceInput={this.maxPriceInput}
              cities={this.cities}
              selectedCity={this.state.selectedCity}
              onSelect={this.handleSelectCity}
              onClick={this.getMeals} />
            <CardList foodItems={this.state.foodItems} getMealById={(id) => this.setCurrentMeal(id)} />
            <ListingModal meal={this.state.currMeal} />
            <button onClick={this.logOut.bind(this)}>Log Out</button>
          </React.Fragment>
        );
      } else {
        return (
          <Login loginFunc={this.logIn.bind(this)} />
=======
  render() {
    let renderRoot = () => {
      if (localStorage.getItem("token")) {
        return (
          <MainPage />
        );
      } else {
        return (
          <Login auth={Auth} />
>>>>>>> ad92a64ea17727293ce0e700fd8c8c22cd7716f7
        );
      }
    }

    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path='/' component={renderRoot} />
            <Route path='/newItem' component={NewItemPage} />
          </Switch>
        </Router>
      </div>
    );
  }
<<<<<<< HEAD

  setCurrentMeal(id) {
    let foodArr = this.state.foodItems;
    let meal = foodArr.find((item) => { return item.mealID === id });
    this.setState({ currMeal: meal });
  }

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
        console.log(result);
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

    // const Url = "https://0o1szwcqn7.execute-api.us-west-2.amazonaws.com/max-stage/listings/";
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
        console.log(result);
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


=======


 
>>>>>>> ad92a64ea17727293ce0e700fd8c8c22cd7716f7
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
<<<<<<< HEAD
      data: JSON.stringify(_data), dataType: "json",
=======
      data: JSON.stringify(_data), 
      // dataType: "json",
>>>>>>> ad92a64ea17727293ce0e700fd8c8c22cd7716f7
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

<<<<<<< HEAD
  handleSelectCity = city => {
    this.setState({ selectedCity: city });
  }

  handleSortOptionChange = sortOption => {
    this.setState({ selectedSortOption: sortOption });
=======
 

  /* Fetches our route from the Express server */
  callBackendAPI = async request => {
    const response = await fetch(request);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
>>>>>>> ad92a64ea17727293ce0e700fd8c8c22cd7716f7
  };
}

export default App;
