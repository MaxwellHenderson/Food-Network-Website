import React, { Component } from 'react';
import ProfileCard from './ProfileCard';
import Posts from './Post';
import NavBar from "../NavBar"
import $ from "jquery";
import './Profile.css';

class ProfilePage extends Component{

    constructor(props){
        super(props);

        this.state = {
            userPostings:[],
            userActivePostings: [],
            userPendingPostings:[],
            userObj: {}
        }

        //list of functions
        this.loadPostings = this.loadPostings.bind(this); //ajax call to db for get-user-postings
        this.loadUserInfo = this.loadUserInfo.bind(this); //ajax call to db for get-user-object

        this.getUserObject = this.getUserObject.bind(this); //promise function
        this.getUserPostings = this.getUserPostings.bind(this); //promist function

        this.sortActive = this.sortActive.bind(this); //sort userPostings[] for active postings
        this.sortPending = this.sortPending.bind(this); //sort userPostings[] for pending postings

        this.callLog = this.callLog.bind(this);
        this.processArray = this.processArray.bind(this); 
        this.promise_async = this.promise_async.bind(this);
        this.promise_setState = this.promise_setState.bind(this);
 
        this.deleteItem = this.deleteItem.bind(this);
    }

    callLog = async(item) =>{
        let result2 = await this.loadPostings(item);
         if(result2 != null){
            var newState = this.state.userPostings.concat(result2.Item);
            await this.promise_setState({ userPostings: newState }) 
         }else{
            console.log("Empty result2")
         }
    }

    processArray = async(array) => {
        for(const item of array)
          await this.callLog(item);
    }


     /*load user postings from database*/
     loadPostings = mealID  => {
        var mealId = String(mealID).trim();
        var pathParam = "/listings/" + mealId;
        var Url="https://0o1szwcqn7.execute-api.us-west-2.amazonaws.com/pj_stage_01";
        Url = Url.concat(pathParam);
 
        return $.ajax({
            url: Url,
            type: 'GET',
            crossDomain: true, 
            contentType: 'application/json',
            dataType: 'json',
           
            success: function(data) {
            },   
            error:function(error) {
                console.log(error); 
            }
        });

    }

    /*get userObj from database*/
    loadUserInfo(email){
        var queryString = "/user/" + email;
        var Url="https://0o1szwcqn7.execute-api.us-west-2.amazonaws.com/pj_stage_01";
        Url = Url.concat(queryString);

       return $.ajax({
            url: Url,
            type: 'GET',
            crossDomain: true, 
            contentType: 'application/json',
            success: function(data) {
            }, 
            error:function(error) {
                console.log(error); 
            }
        });
    }

    promise_setState = async(newState) =>{
        new Promise((resolve) => {
            this.setState(newState, resolve)
        });
    }
    

    /*save user object to state*/
    getUserObject = async() =>{       
        let result = await this.loadUserInfo(localStorage.getItem("email"));  
        if(result  != null){
            await this.promise_setState({userObj:result.Item})
        }else{
            console.log("result is empty"); 
        }
    }

    /*save user postings to state*/
    getUserPostings = async() =>{
        await this.processArray(this.state.userObj.mealIDs);   
    }

    promise_async = async() =>{
        await this.getUserObject()
        console.log("Complete!")
        await this.getUserPostings()
        console.log("DONE!")
        await this.sortActive(this.state.userPostings)
        console.log("Sort Active complete")
        await this.sortPending(this.state.userPostings)
        console.log("Sort Pending complete")
    }
  
    /*sort userPostings[] for active postings*/
    sortActive = async(array) =>{
        array.forEach(async (element) => {
            if(element.listingStatus === "active"){
                var temp = this.state.userActivePostings.concat(element);
                await this.promise_setState({userActivePostings:temp}) 
            }
        });
    }

    /*sort userPostings[] for pending postings*/
    sortPending = async(array) =>{
        array.forEach(async (element) => {
            if(element.listingStatus === "pending"){
                var temp = this.state.userPendingPostings.concat(element);
                await this.promise_setState({userPendingPostings:temp}) 
            }
        });
    }


    //key value comes from Posts
    deleteItem = async(mealId) =>{
        //update all of the state arrays :(
        var filteredItems = this.state.userPostings.filter(function(posting){
            return(posting.mealID !== mealId);
        });
        await this.promise_setState({ userPostings: filteredItems }) 

        filteredItems = this.state.userActivePostings.filter(function(posting){
            return(posting.mealID !== mealId);
        });
        await this.promise_setState({ userActivePostings: filteredItems })

        filteredItems = this.state.userPendingPostings.filter(function(posting){
            return(posting.mealID !== mealId);
        });
        await this.promise_setState({ userPendingPostings: filteredItems }) 
        console.log(this.state.userPostings);

        
    }

    componentDidMount(){
        this.promise_async()
    }

    render(){
        return(
            <div className="profile-container">
                {/* <NavBar></NavBar> */}
                <div className="left-container">
                    <ProfileCard userObj={this.state.userObj}/>
                </div>
                <div className="right-container">
                    <div className="cred-container">
                        <h1>My Listings</h1>
                    </div>
                    <div className="post-container">
                        <h2>Active</h2>
                        <Posts posts={this.state.userActivePostings} userObj={this.state.userObj} userPostings={this.state.userPostings}
                            deleteItem={this.deleteItem}/>
                        <h2>Pending</h2>
                        <Posts posts={this.state.userPendingPostings} userObj={this.state.userObj} userPostings={this.state.userPostings}
                            deleteItem={this.deleteItem}/>
                    </div>     
                </div>
            </div>
        )
    }

}
export default ProfilePage;