import React, { Component } from "react";
import { Link } from 'react-router-dom';

class SignInForm extends Component{
    constructor(){
        super();

        this.state = {
            email:'',
            password:''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        let target = event.target; //select target element
        let value = target.type === 'checkbox' ? target.checked : target.value;//value of the input eg. "pj@gmail.com"
        let name = target.name; //name attribute of the inputs eg. "email"

        this.setState({
            [name]: value //eg. "email": "pj@gmail.com"
        });
    }

    handleSubmit(event){
        event.preventDefault();

        console.log("The form was submitted with the following data:");
        console.log(this.state);
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
}
export default SignInForm;