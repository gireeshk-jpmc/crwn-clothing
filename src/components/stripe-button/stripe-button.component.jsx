import React from 'react';
import './stripe-button.styles.scss';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) =>{
    const proceForStripe = price * 100;
    const publishableKey = 'pk_test_51I2WPUJJ9WztjowAtgIuEuyZSk8HB4b8VcTEb7GrRZLsa9UW9b9Uolp9l6FzHbQdB0tYpaKK6ChEt1UjDStFGqMu00kwNT2lb2';
    const onToken  = token => {
        console.log('token', token);
        alert('Payment Successful');
    }

    return (
        <StripeCheckout
        label='Pay Now'
        name='CRWN Clothing Ltd.'
        billingAddress
        shippingAddress
        image='https://sendeyo.com/up/d/f3eb2117da'
        description={`Your total is $${price}`}
        amount={proceForStripe}
        token={onToken}
        stripeKey={publishableKey}

        />
    );

};

export default StripeCheckoutButton;