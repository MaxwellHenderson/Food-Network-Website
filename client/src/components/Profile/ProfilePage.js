import React, { Component } from 'react';
import ProfileCard from './ProfileCard';
import Posts from './Posts';
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
 
    
    }

    callLog = async(item) =>{
        let result2 = await this.loadPostings(item);
         if(result2 != null){
            var newState = this.state.userPostings.concat(result2.Item);
            await this.promise_setState({ userPostings: newState }) 
            //console.log(" meal object saved: "  + this.state.userPostings[this.state.userPostings.length-1].mealName)
         }else{
            console.log("Empty result2")
         }
    }

    processArray = async(array) => {
        for(const item of array)
          await this.callLog(item);
        //console.log('Done!');
    }


     /*load user postings from database*/
     loadPostings = mealID  => {
        var mealId = String(mealID).trim();
        var pathParam = "/listings/" + mealId;
        var Url="https://0o1szwcqn7.execute-api.us-west-2.amazonaws.com/pj_stage_01";
        Url = Url.concat(pathParam);
 
        var that = this;
        return $.ajax({
            url: Url,
            type: 'GET',
            crossDomain: true, 
            contentType: 'application/json',
            dataType: 'json',
           
            success: function(data) {
                //console.log("What is in meal object?: " + JSON.stringify(data));
                //console.log("ajax request for loading meal info was successful")
            },   
            error:function(error) {
                console.log(error); 
            }
        });

    }

    /*get userObj from database*/
    loadUserInfo(){
        var queryString = "/user/domluu@gmail.com";
        var Url="https://0o1szwcqn7.execute-api.us-west-2.amazonaws.com/pj_stage_01";
        Url = Url.concat(queryString);

       return $.ajax({
            url: Url,
            type: 'GET',
            crossDomain: true, 
            contentType: 'application/json',
            success: function(data) {
                //console.log("whats in the data: " + JSON.stringify(data));
                //console.log("Lets try and grab stuff: " + data.Item.email);
                //console.log("ajax request for loading user info was successful");
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
        let result = await this.loadUserInfo();
        //console.log(result);   
        if(result  != null){
            await this.promise_setState({userObj:result.Item})
            //console.log(" User object saved: "  + this.state.userObj.email) 
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
        //await this.sortPending(this.state.userPostings)
        //console.log("Sort Pending complete")
    }
  

    /*sort userPostings[] for active postings*/
    sortActive = async(array) =>{
        array.forEach(async (element) => {
            if(element.listingStatus === "Active"){
                console.log("Active: " + element.mealName)
                var temp = this.state.userActivePostings.concat(element);
                await this.promise_setState({userActivePostings:temp}) 
            }
        });
    }

    /*sort userPostings[] for pending postings*/
    sortPending = async(array) =>{
        array.forEach(async (element) => {
            if(element.listingStatus === "Pending"){
                console.log("Pending: " + element.mealName)
                var temp = this.state.userPendingPostings.concat(element);
                await this.promise_setState({userPendingPostings:temp}) 
            }
        });
    }
    componentDidUpdate(){
        //this.processArray(this.state.userObj.mealIDs);
    }
    componentDidMount(){
        //this.getUserObject();  
        this.promise_async()
    }

    render(){
        return(
            <div className="profile-container">
                <div className="left-container">
                    <ProfileCard userObj={this.state.userObj}/>
                </div>
                <div className="right-container">
                    <div className="cred-container">
                        <h1>My Listings</h1>
                    </div>
                    <div className="post-container">
                        <h2>Pending</h2>
                        <Posts posts={this.state.userPendingPostings}/>
                        <h2>Active</h2>
                        <Posts posts={this.state.userActivePostings}/>
                    </div>     
                </div>
            </div>
        )
    }

}
export default ProfilePage;