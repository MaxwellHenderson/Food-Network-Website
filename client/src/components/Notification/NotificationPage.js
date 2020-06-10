// Original commit by PJ

import React, { Component } from "react";
import NotificationItem from './NotificationItem';
import firebase from "firebase";
import './Notification.css';
import BellIcon from "react-bell-icon";

class NotificationPage extends Component {
    constructor(props){
        super(props);


        //this array will contain notification payloads from firebase
        this.state={
            notifications: [],
            purchase_requests: [],
            show: false,
            added: false,
            hasNewNotifications: false,
            bellColor: "#000000",
            email: this.props.user.email.replace(".", "_DOT_") 
        }

        this.Read_Notifications = this.Read_Notifications.bind(this);
        this.Load_Notifications_From_Firebase = this.Load_Notifications_From_Firebase.bind(this);
        this.Load_Request_From_Firebase = this.Load_Request_From_Firebase.bind(this);
        this.promise_setState = this.promise_setState.bind(this);
    }



/*CASE 1: user clicks on notification bell and sees stored notifications from firebase */

    promise_setState = async(newState) =>{
        new Promise((resolve) => {
            this.setState(newState, resolve)
        });
    }

    Read_Notifications = async(event) =>{
        event.preventDefault();

        //console.log("Before the if() show: " + this.state.show + " added: " + this.state.added);
        if(this.state.show === false) //is false then proceed to load data
        { 
            await this.promise_setState({ show: true});

            await this.Load_Notifications_From_Firebase(this.state.email);
            // await this.Load_Notifications_From_Firebase(id);
            this.Relax_Notification_Bell();
            //console.log("After first statement show: " + this.state.show + " added: " + this.state.added);
        }
        else //if state is true then reset
        {
            await this.promise_setState({
                notifications: [],
                show:false
            });
            this.Relax_Notification_Bell();
            //console.log("After second statement show: " + this.state.show + " added: " + this.state.added);
        }
    }

    Load_Request_From_Firebase = async(key) =>{
        var that = this;
        firebase.database().ref("requests").child(key)
        .once("value", function(snapshot){
            var newObject = snapshot.val();
            var object_array = that.state.notifications.concat(newObject);

            that.promise_setState({notifications: object_array})
            .then(value=>{
                //console.log(newObject.meal_name + " was added into notification array");
            });            
        })      
    }



    Load_Notifications_From_Firebase = async(email) =>{
        var that = this;

        firebase.database().ref("users/" + email).child("purchase_requests")
        .on("child_added", function(snapshot){

            if(that.state.show === true){ 
                var newKey = snapshot.key;
                //fill notification array
                that.Load_Request_From_Firebase(newKey); 
            }
            else if(that.state.show === false)
            {
                that.Update_Notification_Bell();
            }
        })
    }

/*EOF Case 1*/

/*BOF NOTIFICATION BELL*/

    Update_Notification_Bell(){
        this.setState({
            hasNewNotifications: true,
            bellColor: "#ff2121" 
        })
    }

    Relax_Notification_Bell(){
        this.setState({
            hasNewNotifications: false,
            bellColor: "#000000" 
        })
    }

/*EOF NOTIFICATION BELL*/



    componentDidMount(){
        //testing purposes
        //var myRef = firebase.database().ref('users');
        // myRef.set({
        //     'jerryzhu@gmail_DOT_com' : {
        //         imgsrc: "https://foodimagebucket.s3-us-west-2.amazonaws.com/Users/Eeyore.jpg",
        //         email: "jerryzhu@gmail_DOT_com",
        //         displayname: "jerryzhu34"
        //       },
        //       'pj@gmail_DOT_com': {
        //         imgsrc: "https://foodimagebucket.s3-us-west-2.amazonaws.com/Users/Piglet.png",
        //         email: "pj@gmail_DOT_com",
        //         displayname: "PJ",
        //         // purchase_requests:{
        //         //     // "adsfdfdfaasdf":true,
        //         //     // "dfasdfasdfas": true
        //         // }
        //       },
        //       'domluu@gmail_DOT_com' : {
        //         imgsrc: "https://foodimagebucket.s3-us-west-2.amazonaws.com/Users/Roo.jpg",
        //         email: "domluu@gmail_DOT_com",
        //         displayname: "dommy"
        //       },
        //       'maxhenderson@gmail_DOT_com' : {
        //         imgsrc: "https://foodimagebucket.s3-us-west-2.amazonaws.com/Users/Winnie.jpg",
        //         email: "maxhenderson@gmail_DOT_com",
        //         displayname: "mad max"
        //       }
        // });

       // firebase.database().ref('users/pj@gmail_DOT_com').child("purchase_requests").push().child("sdfasdfsf").push().set(true);
        // firebase.database().ref('users/pj@gmail_DOT_com').child("purchase_requests").child("1234").set(true);
        // firebase.database().ref('users/pj@gmail_DOT_com').child("purchase_requests").child("1223345").set(true);

        //add to purchase request component
        //push purchase request payload to db and update user purchase request list
        // var myRef = firebase.database().ref('requests');
        // var key = myRef.push().getKey();
        // console.log("Key: " + key);
        // myRef.child(key).set({
        //     meal_id: key,
        //     meal_imgsrc: "https://target.scene7.com/is/image/Target/GUEST_5c921084-dcbe-4785-b426-5fc5a4e3f607?wid=488&hei=488&fmt=pjpeg",
        //     meal_name: "jalapeno chips",
        //     meal_price: "4.99",
        //     response: "pending",
        //     seller_displayname: "jerryzhu34",
        //     seller_email: "jerryzhu@gmail_DOT_com",
        //     buyer_displayname: "PJ",
        //     buyer_email: "pj@gmail_DOT_com",
        // }).then((snap)=>{
        //     console.log("What is the value of the key?: " + key);
        //     firebase.database().ref('users/pj@gmail_DOT_com').child("purchase_requests").child(key).set(true);
        //     firebase.database().ref('users/jerryzhu@gmail_DOT_com').child("purchase_requests").child(key).set(true);
        // });

    }



    render(){
        //Notifications are displayed by clicking on the notification bell icon
        //@TODO-LATER: make notification bell component that can render the number of unseen notifications in the corner
        return(
            <div className="not-container">
                <form onSubmit={this.Send_Notification}>
                    <button type="submit">send requests</button>
                </form>
                <form onSubmit={this.Read_Notifications}> 
                    <button type="submit">view requests
                        <BellIcon width='40' active={this.state.hasNewNotifications} animate={this.state.hasNewNotifications} color={this.state.bellColor}/>
                    </button>
                </form>
                <NotificationItem notifications={this.state.notifications} myEmail={this.state.email}/>
            </div>
        );
    }
}

export default NotificationPage;