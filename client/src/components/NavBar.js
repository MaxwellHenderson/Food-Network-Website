import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import firebase from 'firebase';
// import '../components/Notification/Notification.css';
import NotificationItem from'../components/Notification/NotificationItem.js';
import BellIcon from "react-bell-icon";
var email = localStorage.email;
var profileLink = "/profile" + email;

class NavBar extends Component {
    constructor(props){
        super(props);

        const email = localStorage.getItem("email");


        //this array will contain notification payloads from firebase
        this.state={
            notifications: [],
            purchase_requests: [],
            show: false,
            added: false,
            hasNewNotifications: false,
            bellColor: "#000000",
            // email: email.replace(".", "_DOT_") 
            email: email.split('.').join('_DOT_')
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
   
    render() {
        return (
            <React.Fragment>
                <div className="navbar bg-light navbar-expand-md fixed-top top-menu justify-content-between shadow">
                    <NavLink to="./">
                        <div className="nav-link" >Food Network</div>
                    </NavLink>
                    <div className="navbar-nav">
                        <div className="collapse navbar-collapse"  id="navbarNav">
                            <NavLink to="/newItem">
                                <div className="nav-link"><div className="fas fa-plus"></div></div>
                            </NavLink>
                            <div className="nav-link" data-toggle="collapse" data-target="#searchbar" aria-expanded="false">
                                <i className="fas fa-search"></i>
                            </div>     
                            <NavLink to="/">
                                <div className="nav-link" ><i className="fas fa-envelope"></i></div>  
                            </NavLink>
                            {/* <form onSubmit={this.Read_Notifications}>  */}
                                {/* <button type="submit" className=""> */}
                                    <BellIcon width='20' onClick={this.Read_Notifications} type="submit" active={this.state.hasNewNotifications} 
                                        animate={this.state.hasNewNotifications} color={this.state.bellColor}/>
                                {/* </button> */}
                            {/* </form> */}
                            <NavLink to={{
                                pathname: `/profile/${email}`
                                }}>
                                <div className="nav-link" ><i className="fas fa-user-friends"></i></div>    
                            </NavLink>
                        </div>
                        <div className="nav-link" data-toggle="collapse" data-target="#sidebar" aria-expanded="false">
                            <i className="fas fa-bars"></i>
                        </div>
                    </div>
                </div>
                <NotificationItem notifications={this.state.notifications} myEmail={localStorage.getItem("email").split('.').join('_DOT_')}/>
            </React.Fragment>
        );
    }
}


export default NavBar;

