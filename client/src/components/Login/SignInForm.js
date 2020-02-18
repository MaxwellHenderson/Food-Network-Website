import React, { Component } from "react";
import { Link } from 'react-router-dom';
import $ from 'jquery';

class SignInForm extends Component{
    constructor(props){
        super(props);

        this.state = {
            email:'',
            password:''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGetLoginEmail = this.handleGetLoginEmail.bind(this);
    }

    handleChange(event){
        let target = event.target; //select target element
        let value = target.type === 'checkbox' ? target.checked : target.value; //value of the input eg. "pj@gmail.com"
        let name = target.name; //name attribute of the inputs eg. "email"

        this.setState({
            [name]: value //eg. "email": "pj@gmail.com"
        });
    }

    handleSubmit(event){
        event.preventDefault();

        console.log("The form was submitted with the following data:");
        console.log(this.state);
        this.handleGetLoginEmail();
    }


    
    render() {
    return (
        <div className="FormCenter">
              <form className="FormFields" onSubmit={this.handleSubmit}>
                
              <div className="FormField">
                  <label className="FormField__Label" htmlFor="email">Email Address</label>
                  <input 
                    type="email"
                    id="email"
                    className="FormField__Input"
                    placeholder="Enter your Email Address"
                    name="email"
                    required="required"
                    value={this.state.email}
                    onChange={this.handleChange}/>
                </div>

                <div className="FormField">
                  <label className="FormField__Label" htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="FormField__Input"
                    placeholder="Enter your password"
                    name="password"
                    required="required"
                    value={this.state.password}
                    onChange={this.handleChange}/>
                </div>

                <div className="FormField">
                  <button className="FormField__Button mr-20"> Sign In</button>
                  <Link to="/"className="FormField__Link">Create an account</Link>
                </div>

              </form>
          </div>
    );}

    componentDidMount() {
        // this.handleGetLoginEmail();
    }

    handleGetLoginEmail = async () => {
                    
        var queryString = "/user/?email=" + String(this.state.email) + "&password=" + String(this.state.password);
        var Url = "https://0o1szwcqn7.execute-api.us-west-2.amazonaws.com/pj-stage-login-v2"
        Url = Url.concat(queryString);

        const Http = new XMLHttpRequest();
        Http.open("GET", Url);

        //var that = this;
        $.ajax({
            url: Url,
            type: 'GET',
            crossDomain: true, 
            contentType: 'application/json',
            dataType: 'json',
            headers:{
                "accept": "application/json",
            },
            
            success: function(result){
              console.log("SUCCESS MOTHER FRANCK");
            },
            error: function(error){
                console.log(error);
                console.log("UNSUCCESSFUL -PROMPT USER TO TRY AGAIN");
            }
        })
    };

 

}
export default SignInForm;