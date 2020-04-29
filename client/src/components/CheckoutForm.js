import React, { Component } from "react";
import { CardElement } from "@stripe/react-stripe-js";
import '../styles/stripe-style.css';
import $ from 'jquery';

// Modified template code from Stripe code sample
class CheckoutForm extends Component {
    handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        const { stripe, elements } = this.props;

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        const queryString = "?price=" + (this.props.price * 100);
        const url = "https://0o1szwcqn7.execute-api.us-west-2.amazonaws.com/max-stage/payment/" + queryString;

        $.ajax({
            url: url,
            type: 'GET',
            success: async function(response) {
                const client_secret = response.paymentIntent.client_secret;

                const result = await stripe.confirmCardPayment(client_secret, {
                    // Gets a reference to a mounted CardElement. Elements knows how
                    // to find your CardElement because there can only ever be one of
                    // each type of element.
                    payment_method: {
                        card: elements.getElement(CardElement),
                        billing_details: {
                            name: 'John Doe'
                        }
                    }
                });
        
                if (result.error) {
                    console.log(result.error.message);
                    // Show error prompt
                } else {
                    if (result.paymentIntent.status === 'succeeded') {
                        // Show success prompt
                        console.log("Payment succeeded");
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