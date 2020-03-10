import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { Link } from 'react-router-dom';

class SignInForm extends Component{
    constructor(props){
        super(props);

        this.state = {
            email:'',
            password:'',
            jwt: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleGetLoginEmail = this.handleGetLoginEmail.bind(this);   //obsolete 
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

        // @TODO EXPECTED:
        //     if (user is authenticated and session has not expired)
        //         directToMainPage();
        //     else if(user is not authenticated or session has expired)
        //         Auth.signIn(email,password); //sign in to cognito
        //     else
        //         //user is not registered
        //         //prompt user to register

        try {
            // const user = await Auth.signIn(this.state.email, this.state.password);
            console.log("Hurray, I am successfully authenticated~!");
            
            const auth = await Auth.currentSession();
            // const auth = await Auth.currentAuthenticatedUser();
            console.log(auth.idToken.jwtToken);
            localStorage.setItem("token", auth.idToken.jwtToken);
            this.props.loginFunc(auth);
        } catch(error) {
            console.log(error);
            // TODO: prompt user to try again
        }
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
        );
    }
}
export default SignInForm;