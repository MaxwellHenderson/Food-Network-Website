import React, { Component } from "react";
import NotificationItem from './NotificationItem';
import firebase from './Firebase';
import './Notification.css';
import { TextField } from "material-ui";

class Notifications extends Component{
    constructor(props){
        super(props);

        //this array will contain notification payloads from firebase
        this.state={
            notifications: [],
            show: true
        }

        this.create_Buyer_Request_Notification = this.create_Buyer_Request_Notification.bind(this);
        this.create_Seller_Request_Notification = this.create_Seller_Request_Notification.bind(this);
        this.create_Buyer_Notification_Response = this.create_Buyer_Notification_Response.bind(this);
        this.create_Seller_Notification_Response = this.create_Seller_Notification_Response.bind(this);

        this.Read_Notifications = this.Read_Notifications.bind(this);
        this.Load_Notifications_From_Firebase = this.Load_Notifications_From_Firebase.bind(this);
        this.Send_Notification = this.Send_Notification.bind(this);
        this.Store_Notification_To_Firebase = this.Store_Notification_To_Firebase.bind(this);
    }

    //Notification bodies for when a purchase request is made
    create_Buyer_Request_Notification(seller_name, meal_name, meal_price){
        return "You have requested to purchase " + meal_name + " from " + seller_name + " for " + meal_price;
    }
    create_Seller_Request_Notification(buyer_name, meal_name, meal_price){
        return buyer_name + "has requested to purchase " + meal_name + " for " + meal_price;
    }

    //Notification bodies for when a purchase request is accepted or declined
    create_Buyer_Notification_Response(seller_name, meal_name, seller_response){
        return seller_name + " has " + seller_response + " your request to purchase " + meal_name;
    }
    create_Seller_Notification_Response(buyer_name, meal_name, meal_price, seller_response){
        return "You have " + seller_response + " " + buyer_name + "'s request to purchase " + meal_name + " for " + meal_price;
    }


/*CASE 1: user clicks on notification bell and sees stored notifications from firebase */

    Read_Notifications(event){
        event.preventDefault();

        if(this.state.show)
        { //show list of notifications upon button click

            //email grabbed from props
            //var email = this.props.email;
           
            //temp data
            var userid = "lP8Dd1ts8QMUj2wqi7vdPLOcYiG4";
            this.Load_Notifications_From_Firebase(userid);
            //this.Load_Notification_From_Firebase(email);


            //update state
            this.setState({ show: false});
        }
        else
        {//hide notifications upon the next button click
            this.setState({
                notifications: [], //empty out list
                show:true //set show to true
            });
        }
    }

    Load_Notifications_From_Firebase(userId){
        var that = this;
        var myRef = firebase.database().ref('users/' + userId + '/requests/');
        myRef.once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var value = childSnapshot.val();

                //create new item
                var newItem = {
                    imgsrc: value.imgsrc,
                    body: value.body,
                    key: value.key
                }

                //add newItem to notifications state
                that.setState((prevState) => {
                    return {
                        notifications: prevState.notifications.concat(newItem),
                    };
                });
            });
          });
    }

/*CASE 2: user clicks on request purchase button; a notification payload is stored into user's database. Cloud function is triggered*/

    Send_Notification(event){
        event.preventDefault();

        //To be discussed

        //create request payload to seller
        
        var body = this.create_Buyer_Request_Notification()
        var userid = "lP8Dd1ts8QMUj2wqi7vdPLOcYiG4";
        var imgsrc = "https://www.hawaiipublicradio.org/sites/khpr/files/201904/f565935bcf5d89a11d261af1db9bfc0c.jpg";
        this.save_Notification_To_Firebase(userid, body, imgsrc, false);




        //create request payload to buyer
        //var buyerbody = "You have sent a purchase request to jerry zhu";
    }



    //upon checkout, buyer saves intent to database
    Store_Notification_To_Firebase(userId, myBody, myAvatar, myResponse){
        var myRef = firebase.database().ref().child('users/' + userId).push();
        var myKey = myRef.key;
        var data = {
            body: myBody,
            key: myKey,
            imgsrc: myAvatar,
            response: myResponse //purchase request accepted or denied
        };
        firebase.database().ref().child('users/' + userId + '/requests/' + myKey).set(data);
        console.log("request has been written");
    }







    render(){
        //Notifications are displayed by clicking on the notification bell icon
        //@TODO-LATER: make notification bell component that can render the number of unseen notifications in the corner
        return(
            <div className="not-container">
                <form onSubmit={this.Send_Notification}>
                    <button type="submit">send request</button>
                </form>
                <form onSubmit={this.Read_Notifications}> 
                    <button type="submit">view requests</button>
                </form>
                <NotificationItem list_of_notifications={this.state.notifications}/>
            </div>
        );
    }
}

export default Notifications;