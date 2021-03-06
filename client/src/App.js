'use strict';

import React, { Component, useState } from "react";
import NewItemPage from "./components/NewItemPage.js";
import ListingPage from './components/ViewListingPage.js';
import ListingModal from './components/ListingModal.js';
import NavBar from "./components/NavBar.js";
import SideBar from "./SideBar.js";
import CardList from "./CardList.js";
import UpdateItemPage from "./components/UpdateItemPage";
import Login from "./components/Login/Login.js";
import MainPage from "./components/MainPage.js";

import $ from 'jquery';
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.css";

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Amplify, { Auth } from 'aws-amplify';
import ProfilePage from "./components/Profile/ProfilePage.js";

// Manual Amplify configuration
// See https://aws-amplify.github.io/docs/js/authentication#amplify-project-setup
// for other configuration options.
Amplify.configure({
  Auth: {
      // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
      identityPoolId: 'us-west-2:4809a3a5-d7b3-436a-9030-4ec877205e7a',
      
      // REQUIRED - Amazon Cognito Region
      region: 'us-west-2',

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'us-west-2_89J8r5C88',

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: '6a9fkc41bp4j2r5ihu3vibm5a2',
  }
});

// You can get the current config object
// const currentConfig = Auth.configure();
// let auth = new AmazonCognitoIdentity(CognitoAuth(currentConfig))

class App extends Component {
  render() {
    let renderRoot = () => {
      if (localStorage.getItem("token")) {
        return (
          <MainPage />
        );
      } else {
        return (
          <Login auth={Auth} />
        );
      }
    }

    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path='/' component={renderRoot} />
            <Route path='/newItem' component={NewItemPage} />
            <Route path='/profile' component={ProfilePage} />
            <Route path='/updateItem' component={UpdateItemPage} />
          </Switch>
        </Router>
      </div>
    );
  }


 
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
      data: JSON.stringify(_data), 
      // dataType: "json",
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

 

  /* Fetches our route from the Express server */
  callBackendAPI = async request => {
    const response = await fetch(request);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };
}

export default App;
