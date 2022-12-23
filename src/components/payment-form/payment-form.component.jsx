import { useState } from "react";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";

import { selectCartTotal } from "../../store/cart/cart.selector";
import { setCurrentUser } from "../../store/user/user.action";

import { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { PaymentFormContainer, FormContainer, PaymentButton } from "./payment-form.styles";

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(setCurrentUser);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const paymentHandler = async (e) => {
        e.preventDefault();

        if(!stripe || !elements){
            return;
        }

        setIsProcessingPayment(true);

        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({amount: amount * 100}),
        }).then((res) =>  {
            return res.json();
        });

        const client_secret = response.paymentIntent.client_secret;

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: currentUser ? currentUser.displayName : 'Guest',
                },
            },
        });

        setIsProcessingPayment(false);

        if(paymentResult.error){
            alert(paymentResult.error.message);
        } else {
            if(paymentResult.paymentIntent.status === 'succeeded'){
                alert('Payment successful!');
            }
        };
        
    };

    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Create Card Payment: </h2>
                <CardElement/>
                <PaymentButton isLoading={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted}> Pay now </PaymentButton>        
            </FormContainer>        
        </PaymentFormContainer>
    )
}

export default PaymentForm;