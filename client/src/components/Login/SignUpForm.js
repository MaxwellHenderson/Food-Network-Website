import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Auth } from "aws-amplify";
import $ from 'jquery';


class SignUpForm extends Component{
  constructor(props){
    super(props);

    this.state = {
      username: '',
      email:'', //UUID
      password:'',
      location: '', 
      hasAgreedToTerms: String(false)
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateUserName = this.updateUserName.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
  }

    updateUserName(event){
      this.setState({
        username: event.target.value
      });
    }
    updateLocation(event){
      this.setState({
        location: event.target.value
      });
    }

    handleChange(event){
        let target = event.target; //select target element
        let value = target.type === 'checkbox' ? target.checked : target.value;//value of the input eg. "pj@gmail.com"
        let name = target.name; //name attribute of the inputs eg. "email"

        this.setState({
            [name]: value //eg. "email": "pj@gmail.com"
        });
    }

    async handleSubmit(event){
      event.preventDefault();

      var email = this.state.email;
      var password = this.state.password;
      try {
        const signUpResponse = await Auth.signUp(email, password);
        console.log(signUpResponse);
      } catch (error) {
        console.log(error);
      }
    }


    render() {
        return(
            <div className="FormCenter">
              <form className="FormFields" onSubmit={this.handleSubmit}>
                
                <div className="FormField">
                  <label className="FormField__Label" htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    className="FormField__Input"
                    placeholder="Enter your full name"
                    name="name"
                    required="required"
                    value={this.state.username}
                    onChange={this.updateUserName.bind(this)}/>
                </div>

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
                  <label className="FormField__Label" htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    className="FormField__Input"
                    placeholder="Enter your city"
                    name="city"
                    required="required"
                    value={this.state.location}
                    onChange={this.updateLocation.bind(this)}/>
                </div>
                
                <div className="FormField">
                  <label className="FormField__CheckboxLabel">
                    <input
                      className="FormField__Checkbox"
                      type="checkbox"
                      name="hasAgreed"
                      required="required"
                      value={this.state.hasAgreedToTerms}
                      onChange={this.handleChange}/>

                      I agree to the statements in <a href="a" className="FormField__TermsLink">terms of service</a>
                  </label>
                </div>

                <div className="FormField">
                  <button className="FormField__Button mr-4"> Sign Up</button>
                  <Link to="/sign-in" className="FormField__Link">I'm already a member</Link>
                </div>
              </form>
          </div>
        );
    };
}

export default SignUpForm;