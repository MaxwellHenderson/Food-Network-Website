import React, { Component } from "react";
import Avatar from 'react-avatar';
import './Notification.css';

//NotificationItem class handles only the display of the notifications
class NotificationItem extends Component{
    constructor(props){
        super(props);

        this.display_Notification = this.display_Notification.bind(this);
    }

    //@TODO-LATER: make accept and decline buttons dynamic
    display_Notification(notification){
        return <li key={notification.key}> 
                    <Avatar className="avatar" size="30px" round="50px" src={notification.imgsrc}/>
                    <p>{notification.body}</p>
                    <button className="accept-bttn">accept</button> 
                    <button className="decline-bttn">decline</button>   
                </li>
    }

    render(){
        //grab array of notifications from props
        var list_of_notifications = this.props.list_of_notifications;
        //iterate through each item in array and pass it to a function that generates html for each notification object
        var items = list_of_notifications.map(this.display_Notification);

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