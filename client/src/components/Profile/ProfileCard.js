import React, { Component } from "react";
import './Profile.css';

class ProfileCard extends Component{

    render(){
        var userObj = this.props.userObj;
        return(
            <div className="card-container-no-shadow">
                <img className="avatar-img" src={userObj.imgsrc} alt="Avatar"/>
                <div className="container">
                    <h4><b>{userObj.firstname} {userObj.lastname}</b></h4>
                    <h5><b>{userObj.displayname}</b></h5>
                    <p>{userObj.city}</p>
                    <p>{userObj.rating}</p>
                </div>
            </div>
        );
    }
}
export default ProfileCard;