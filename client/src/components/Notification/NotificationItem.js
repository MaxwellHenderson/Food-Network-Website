import React, { Component } from "react";
import firebase from './Firebase';
import Avatar from 'react-avatar';
import './Notification.css';

//NotificationItem class handles only the display of the notifications
class NotificationItem extends Component{
    constructor(props){
        super(props);

        this.state = {
            notifications: [],
            items:{}
        }

        this.display_Notification = this.display_Notification.bind(this);
        this.display_Correct_Notification_Body = this.display_Correct_Notification_Body.bind(this);

        this.create_Buyer_Request_Notification = this.create_Buyer_Request_Notification.bind(this);
        this.create_Seller_Request_Notification = this.create_Seller_Request_Notification.bind(this);
        this.create_Buyer_Notification_Response = this.create_Buyer_Notification_Response.bind(this);
        this.create_Seller_Notification_Response = this.create_Seller_Notification_Response.bind(this);

        this.update_Request_Status = this.update_Request_Status.bind(this);
    }

        //Notification bodies for when a purchase request is made
        create_Buyer_Request_Notification(seller_name, meal_name, meal_price){
            return "You have requested to purchase " + meal_name + " from " + seller_name + " for " + meal_price;
        }
        create_Seller_Request_Notification(buyer_name, meal_name, meal_price){
            return buyer_name + "has requested to purchase " + meal_name + " from you for " + meal_price;
        }
    
        //Notification bodies for when a purchase request is accepted or declined
        create_Buyer_Notification_Response(seller_name, meal_name, seller_response){
            return seller_name + " has " + seller_response + " your request to purchase " + meal_name;
        }
        create_Seller_Notification_Response(buyer_name, meal_name, meal_price, seller_response){
            return "You have " + seller_response + " " + buyer_name + "'s request to purchase " + meal_name + " for " + meal_price;
        }
    

    display_Correct_Notification_Body(notification){

        if(notification.seller_email === this.props.myEmail){ //I am a seller

            if(notification.response === "pending") //and I see a pending request from a buyer
            { 
                return <p>{this.create_Seller_Request_Notification(notification.buyer_displayname, notification.meal_name, notification.meal_price)}</p>
            }
            else //and I have accepted or declined a request from a buyer
            {
                return <p>{this.create_Seller_Notification_Response(notification.buyer_displayname, notification.meal_name, notification.meal_price, notification.response)}</p>
            }

        }else{ //I am a buyer

            if(notification.response === "pending") //and I see a pending request from a seller
            { 
                return <p>{this.create_Buyer_Request_Notification(notification.seller_displayname, notification.meal_name, notification.meal_price)}</p>
            }
            else //and I have accepted or declined a request from a buyer
            {
                return <p>{this.create_Buyer_Notification_Response(notification.seller_displayname, notification.meal_name, notification.meal_price, notification.response)}</p>
            }
        }
    }

    update_Request_Status(key,status){
        //console.log("what is the key: " + key + " status: " + status);
        firebase.database().ref("requests/" + key + "/response").set(status);
    }

    //@TODO-LATER: make accept and decline buttons dynamic
    display_Notification(notification){
        return <li key={notification.meal_id}> 
                    <Avatar className="avatar" size="30px" round="50px" src={notification.meal_imgsrc}/>
                    {this.display_Correct_Notification_Body(notification)}
                    <button className="accept-bttn" onClick={() => this.update_Request_Status(notification.meal_id,"accepted")}>accept</button> 
                    <button className="decline-bttn" onClick={() =>this.update_Request_Status(notification.meal_id,"declined")}>decline</button>   
                </li>
    }


    render(){
        var notifications = this.props.notifications;
        var items = notifications.map(this.display_Notification);
        //display the returned html of list items
        return(
            <div className="item-container">
                <ul className="item-list">
                    {items} 
                </ul>
            </div>
        )
    }
}
export default NotificationItem;