import React, { Component } from "react";
import './Profile.css';

class Posts extends Component{
    constructor(props){
        super(props);
        this.createPost = this.createPost.bind(this);
    }

    //Create PostCard
    createPost(post){
        return <li key={post.mealID}> 
                    <div className="card-container">
                        <img className="meal-img" src={post.mealImagePath} alt="Meal-posting"/>
                        <div className="container">
                            <h4><b>{post.mealName}</b></h4>
                            <p>{post.mealPrice}</p>
                            <p>{post.mealDescription}</p>
                        </div>
                    </div>         
                </li>
    }

    render(){
        var posts = this.props.posts;
        console.log("What is the length of this prop: " + posts.length)
        var list_of_posts = posts.map(this.createPost);
        return (
            <ul className="post-list">
                {list_of_posts}
            </ul>
        );
    }

}
export default Posts;