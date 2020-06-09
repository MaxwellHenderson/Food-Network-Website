import React, { Component } from "react";
import { CardElement } from "@stripe/react-stripe-js";
import '../styles/stripe-style.css';
import $ from 'jquery';

import firebase from "firebase/app";

// Modified template code from Stripe code sample
class CheckoutForm extends Component {
    handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        const { stripe, elements } = this.props;
        const meal = this.props.meal;
        const user = this.props.user;
        
        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        const queryString = "?mealId=" + (this.props.mealId);
        const url = "https://0o1szwcqn7.execute-api.us-west-2.amazonaws.com/max-stage/payment/" + queryString;
        console.log(url);

        $.ajax({
            url: url,
            type: 'GET',
            headers: {
                accept: "application/json",
            },
            success: async function(response) {
                console.log(response);
                const client_secret = response.client_secret;

                const result = await stripe.confirmCardPayment(client_secret, {
                    // Gets a reference to a mounted CardElement. Elements knows how
                    // to find your CardElement because there can only ever be one of
                    // each type of element.
                    payment_method: {
                        card: elements.getElement(CardElement),
                        billing_details: {
                            name: "John Doe" 
                        }
                    }
                });
        
                if (result.error) {
                    console.log(result.error.message);
                    // Show error prompt
                } else {
                    if (result.paymentIntent.status === 'succeeded') {
                        console.log(meal);
                        console.log(meal.mealID);
                        console.log(meal.mealImagePath);
                        console.log(meal.mealName);
                        console.log(meal.mealPrice);

                        console.log(meal.poster); // meal poster eamil
                        console.log(user.displayname);
                        console.log(user.email);


                        var myRef = firebase.database().ref('requests');
                        var key = myRef.push().getKey();
                        console.log("Key: " + key);
                        myRef.child(key).set({
                            meal_id: key,
                            meal_imgsrc: "https://target.scene7.com/is/image/Target/GUEST_5c921084-dcbe-4785-b426-5fc5a4e3f607?wid=488&hei=488&fmt=pjpeg",
                            meal_name: "jalapeno chips",
                            meal_price: "4.99",
                            response: "pending",
                            seller_displayname: "jerryzhu34",
                            seller_email: "jerryzhu@gmail_DOT_com",
                            buyer_displayname: "PJ",
                            buyer_email: "pj@gmail_DOT_com",
                        }).then((snap)=>{
                            console.log("What is the value of the key?: " + key);
                            firebase.database().ref('users/pj@gmail_DOT_com').child("purchase_requests").child(key).set(true);
                            firebase.database().ref('users/jerryzhu@gmail_DOT_com').child("purchase_requests").child(key).set(true);
                        });
                        // Show success prompt
                        console.log("Payment succeeded");
                        window.setTimeout(null, 3000);
                        window.location.href = "/";
                    }
                }
            }, 
            error: function(error) {
                // Show error prompt
                console.log(`Error: ${error}`);
            }
        })
    };

    render() {
        const {stripe} = this.props;

        return (
                <form id="paymentSubmit" className="collapse mx-auto p-3 border border-secondary rounded" onSubmit={this.handleSubmit}>
                    <CardElement 
                        options={{
                            style: {
                                base: {
                                    fontSize: '20px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        }}
                    />
                    <button id="paymentSubmitButton" type="submit" disabled={!stripe} >
                        Pay
                    </button>
                </form>
        )
    }
} 

export default CheckoutForm;