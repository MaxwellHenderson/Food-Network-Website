import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import './App.css';

class Login extends Component {


  render() {
   let renderLogin = () => {
      return (
        <SignInForm loginFunc={this.props.loginFunc.bind(this)}/>
      );
    }
    
   return (
        <Router>
          <div className="Appp">
            <div className="App__Aside">
            </div>
            <div className="App__Form">
              <div className="PageSwitcher">
                <NavLink to="/sign-in"
                  className="PageSwitcher__Item"
                  activeClassName="PageSwitcher__Item PageSwitcher__Item--Active">Sign In</NavLink>
                <NavLink exact to="/"
                  className="PageSwitcher__Item"
                  activeClassName="PageSwitcher__Item PageSwitcher__Item--Active">Sign Up</NavLink>
              </div>

              <div className="FormTitle">
                <NavLink to="/sign-in"
                  activeClassName="FormTitle__Link FormTitle__Link--Active"
                  className="FormTitle__Link">Sign In</NavLink>
                  or 
                <NavLink exact to="/"
                  activeClassName="FormTitle__Link FormTitle__Link--Active"
                  className="FormTitle__Link">Sign Up</NavLink>
              </div>

              <Route exact path="/" component={SignUpForm}/>
              {/* <Route path="/sign-in" component={SignInForm}/> */}
              <Route path="/sign-in" render={renderLogin}/>

            </div>
          </div>
        </Router>
      );
  }
}

export default Login;
