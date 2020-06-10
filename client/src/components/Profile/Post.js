import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import $ from "jquery";
import './Profile.css';
import UpdateItemPage from "../UpdateItemPage";

class Posts extends Component{
    constructor(props){
        super(props);
        this.state={
            index:''
        }
        this.createPost = this.createPost.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    Delete_Meal_From_Meals_Table = async(mealID) =>{
        var pathParam = "/listings/" + mealID;
        var Url="https://0o1szwcqn7.execute-api.us-west-2.amazonaws.com/pj_stage_01";
        Url = Url.concat(pathParam);
 
        return $.ajax({
            url: Url,
            type: 'DELETE',
            crossDomain: true, 
            contentType: 'application/json',
            dataType: 'json',
           
            success: function(data) {
                console.log("Successfully delete from users table");
            },   
            error:function(error) {
                console.log(error); 
            }
        });

    }

    Delete_Meal_From_Users_Table = async(userID, mealID, index) =>{
        var pathParam = "/user/" + userID + "/" + mealID + "/" + index;
        var Url="https://0o1szwcqn7.execute-api.us-west-2.amazonaws.com/pj_stage_01";
        Url = Url.concat(pathParam);
 
        return $.ajax({
            url: Url,
            type: 'DELETE',
            crossDomain: true, 
            contentType: 'application/json',
            dataType: 'json',
           
            success: function(data) {
                console.log("Successfully delete from users table");
            },   
            error:function(error) {
                console.log(error); 
            }
        });
    }

    delete(key){
        //test
        console.log("Key is:" + key);
        this.props.delete(key);
    }

    deletePost = async(mealID)=>{
        //grab key information
        var userID = this.props.userObj.email;

        //get index
        var index = 0;
        this.props.userPostings.forEach((item)=>{
            console.log(item);
            if(item.mealID !== mealID){
                index++;
            }
        })
        console.log("Index: " + index);

        //pass userId, mealId, index and execute
        await this.Delete_Meal_From_Users_Table(userID, mealID, index);
        console.log("Deleted meal from users table");
        await this.Delete_Meal_From_Meals_Table(mealID);
        console.log("Deleted meal from meals table");

        //update props state
        this.props.deleteItem(mealID);
    }

    // editItem(mealID){
    //     localStorage.setItem("mealID",mealID);
    //     UpdateItemPage uip;
    // }

    //Create PostCard
    createPost(post){
        return <li key={post.mealID}> 
                    <div className="card-container">
                        <img className="meal-img" src={post.mealImagePath} alt="Meal-posting"/>
                        <div className="container">
                            <h4><b>{post.mealName}</b></h4>
                            <p>{post.mealPrice}</p>
                            <p>{post.mealDescription}</p>
                            <p>{post.mealID}</p>
                            <button type="button" onClick={()=> {this.deletePost(post.mealID)}}>remove</button>
                            {/* <button type="button">edit</button> */}
                            <NavLink to="/updateItem">
                                <div className="nav-link" onClick={()=>localStorage.setItem("mealID",post.mealID)}><div className="fas fa-plus"></div></div>
                            </NavLink>

                        </div>
                    </div>         
                </li>
    }

    render(){
        var posts = this.props.posts;
        var list_of_posts = posts.map(this.createPost);
        return (
            <ul className="post-list">
                {list_of_posts}
            </ul>
        );
    }

}
export default Posts;