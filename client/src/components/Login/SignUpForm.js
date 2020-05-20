import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Auth } from "aws-amplify";
import $ from 'jquery';


class SignUpForm extends Component{
  constructor(props){
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      email:'', //UUID
      password:'',
      location: '', 
      hasAgreedToTerms: String(false),
      code: '',
      step: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.updateUserName = this.updateUserName.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.updateCode = this.updateCode.bind(this);

    this.signUp = this.signUp.bind(this);
    this.confirmSignUp = this.confirmSignUp.bind(this);

    this.handleGetEmail = this.handleGetEmail.bind(this);
    this.handleCreateNewUser = this.handleCreateNewUser.bind(this);
  }

/* UPDATES */
    updateFirstName(event){
      this.setState({
        firstName: event.target.value
      });
    }
    updateLastName(event){
      this.setState({
        lastName: event.target.value
      });
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
    updateCode(event){
      this.setState({
        code: event.target.value
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
/* EOF UPDATES */


  async signUp(event){
      event.preventDefault();

      var email = this.state.email;
      var password = this.state.password;
      console.log("what is email: ",email);
      console.log("what is password: " ,password);

      try{
        await Auth.signUp({username: email, password: password,});
        console.log("Signed up successfully!");
        this.handleCreateNewUser();
        this.setState({ step: 1 });
      }catch(err){
        console.log("Error signing up: ", err);
      }
    }

    async confirmSignUp(event){
      event.preventDefault();

      var email = this.state.email;
      var code = this.state.code;
      console.log("what is the authentication code:", code);
      try{
         await Auth.confirmSignUp(email, code);
        console.log("Successfully confirmed signup!");

        //putting the rest of the user information into db
        this.handleGetEmail();

        this.setState({ step: 0 });
      }catch(err){
        console.log("Error signing up: ", err);
      }
    }

    handleCreateNewUser = async () => { 
      console.log("Trying to add user to DB");
      const Url="https://0o1szwcqn7.execute-api.us-west-2.amazonaws.com/pj-stage-login-v2/user";
      const _data={
        "firstname": this.state.firstName,
        "lastname": this.state.lastName,
        "username": this.state.username,
        "email": this.state.email,
        "location": this.state.location,
        "hasAgreedToTerms": this.state.hasAgreedToTerms
      }
      console.log(JSON.stringify(_data));
      
      const Http = new XMLHttpRequest();
      Http.open("POST", Url);
  
      $.ajax({
        url: Url,
        type: 'POST',
        crossDomain: true, 
        contentType: 'application/json',
        dataType: 'json',
        headers:{
            "accept": "application/json",
            "Access-Control-Allow-Origin": '*'
        },
        data: JSON.stringify(_data),
  
        success: function(result) {
          console.log(result);
        }, 
        error:function(error) {
          console.log(error); 
        }
      });
      return false;
    }

    handleGetEmail = async () => {                 
      var queryString = "/email/?email=" + String(this.state.email);
      var Url = "https://0o1szwcqn7.execute-api.us-west-2.amazonaws.com/pj-stage-login-v2"
      Url = Url.concat(queryString);

      console.log(Url);
      const Http = new XMLHttpRequest();
      Http.open("GET", Url);

      var that = this;
      $.ajax({
          url: Url,
          type: 'GET',
          crossDomain: true, 
          contentType: 'application/json',
          dataType: 'json',
          header:{
              "accept": "application/json",
               "Access-Control-Allow-Origin": '*'
          },
          
          success: function(result){
              if(result.Count === 0){
                console.log("Email does not exist proceed to signup");
                that.handleCreateNewUser();
               // window.location.reload();
              }else{
                console.log("Email exists");
              }
          },
          error: function(error){
              console.log(error);
          }
      })
    }



    render() {
        return(
            <div className="FormCenter">
              {
                this.state.step === 0 && (
                
                  <form className="FormFields" onSubmit={this.signUp}>
                    
                    <div className="FormField">
                      <label className="FormField__Label" htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        className="FormField__Input"
                        placeholder="Enter your first name"
                        name="firstName"
                        required="required"
                        value={this.state.firstName}
                        onChange={this.updateFirstName.bind(this)}
                        />
                    </div>

                    <div className="FormField">
                      <label className="FormField__Label" htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        className="FormField__Input"
                        placeholder="Enter your last name"
                        name="lastName"
                        required="required"
                        value={this.state.lastName}
                        onChange={this.updateLastName.bind(this)}
                        />
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
                      <label className="FormField__Label" htmlFor="username">Username</label>
                      <input
                        type="username"
                        id="username"
                        className="FormField__Input"
                        placeholder="Choose a username"
                        name="username"
                        required="required"
                        value={this.state.username}
                        onChange={this.updateUserName.bind(this)}/>
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
                      <button className="FormField__Button mr-20"> Sign Up</button>
                      <Link to="/sign-in" className="FormField__Link">I'm already a member</Link>
                    </div>
                  </form>
              
                  )
                }
                {
                this.state.step === 1 && (
                
                  <form className="FormFields" onSubmit={this.confirmSignUp}>
   
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
                        onChange={this.handleChange.bind(this)}/>
                    </div>
                    
                    <div className="FormField">
                      <label className="FormField__Label" htmlFor="authenticationCode">City</label>
                      <input
                        type="text"
                        id="authenticationCode"
                        className="FormField__Input"
                        placeholder="Enter Authentication Code"
                        name="authenticationCode"
                        required="required"
                        value={this.state.code}
                        onChange={this.updateCode.bind(this)}/>
                    </div>
                    

                    <div className="FormField">
                      <button className="FormField__Button mr-20"> Confirm Signup</button>
                      <Link to="/sign-in" className="FormField__Link">I'm already a member</Link>
                    </div>
                  </form>
                  )
                }
          </div>
        );
    };
}

export default SignUpForm;