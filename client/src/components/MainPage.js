import React, {Component} from "react";
import ListingModal from './ListingModal.js';
import CardList from "../CardList.js";
// import NavBar from "./NavBar.js";
// import SideBar from "./SideBar.js";
// import SearchForm from "../component/search-form.jsx";
import ListingPage from "../ViewListingPage.js";

import $ from 'jquery';
import { Route, NavLink } from 'react-router-dom';
import aws4 from 'aws4';
import { Auth } from 'aws-amplify';


class MainPage extends Component {
    constructor(props) {
        super(props);

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
        // this.getMealIDs();
        this.getMeals();
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


    // getMeals = async () => {
    //     const url = "https://0o1szwcqn7.execute-api.us-west-2.amazonaws.com/max-stage/listings/";
    //     const http = new XMLHttpRequest();
    //     http.open("get", url);
    //     http.onreadystatechange = (e) => {
    //         console.log(http.responsetext)
    //     }

    //     var that = this;
    //     $.ajax({
    //         url: url,
    //         type: 'get',
    //     }).then(meals => {
    //         let filteredmeals = meals.filter(meal => {
    //             return that.state.mealids.includes(meal.mealid);
    //         });
    //         that.setstate({ fooditems: filteredmeals })
    //     })
    // };

    getMeals = async () => {
        const opts = {
            method: "GET",
            service: "execute-api",
            region: "us-west-2",
            path: "/listings",
            url: "https://0o1szwcqn7.execute-api.us-west-2.amazonaws.com/stage-1/listings/"
        };

        var that = this;
        const credentials = await Auth.currentCredentials();
        const { accessKeyId, secretAccessKey, sessionToken } = credentials;
        const request = aws4.sign(opts.url, {
            accessKeyId,
            secretAccessKey,
            sessionToken
        });

        $.ajax({
            url: opts.url,
            headers: request.headers,
            success: function(result){
                that.setState({
                    foodItems: that.state.selectedSortOption.sort(result)
                })
            },
            error: function(error){
                console.log(`Error ${error.responseText}`)
            }
        })
    };

    getMealIDs = async () => {
        /* If input fields are empty, set to default values */
        // let city = "";
        // let rating =  "";
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

    setCurrentMeal(id) {
        let foodArr = this.state.foodItems;
        let meal = foodArr.find((item) => { return item.mealID === id });
        this.setState({ currMeal: meal });
        console.log(this.state.mealIDs);
    }
     
    render() {
        let renderMain = () => {
            return (
                <React.Fragment>
                    {/* <NavBar /> */}
                    {/* <SideBar /> */}
                    {/* <SearchForm mealNameInput={this.mealNameInput} ratingInput={this.ratingInput} cityInput={this.cityInput} onClick={this.getMealIDs} /> */}
                    <CardList foodItems={this.state.foodItems} getMealById={(id) => this.setCurrentMeal(id)} />
                    <ListingModal meal={this.state.currMeal} />
                    <NavLink to='/'>
                        <button onClick={this.props.logOutFunc}>Log Out</button>
                    </NavLink>
                </React.Fragment>
            );
        }

        let renderListing =  () => {
            return (
                <ListingPage meal={this.state.currMeal} />
            );
        }

        return (
            <React.Fragment>
                <Route exact path = '/' component={renderMain} />
                <Route path = '/listing' component={renderListing} />
            </React.Fragment>
        );
    }
}

export default MainPage;