import { Alert, Button, CircularProgress } from '@mui/material';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect } from 'react';
import { useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const CheckoutForm = ({ bill, orders }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        fetch('https://frozen-dusk-78727.herokuapp.com/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ bill })
        })
            .then(res => res.json())
            .then(data => setClientSecret(data.clientSecret))
    }, [bill]);


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        setProcessing(true);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            setError(error.message);
            setSuccess('');
        }
        else {
            setError('');
            console.log(paymentMethod);
        }

        // payment intent
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user.displayName,
                        email: user.email
                    },
                },
            },
        );

        if (intentError) {
            setError(intentError.message);
            setSuccess('');
        }
        else {
            setError('');
            setSuccess('Payment successfully');

            orders.map(order => {
                fetch(`https://frozen-dusk-78727.herokuapp.com/orders/${order._id}`, {
                    method: 'DELETE'
                })
            })

            console.log(paymentIntent);
        }
        setProcessing(false);
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />

                {
                    processing ? <CircularProgress /> : <Button variant="contained"
                        sx={{ px: 3, mb: 2 }}
                        type="submit"
                        disabled={!stripe || success}
                    >
                        Pay {bill}
                    </Button>
                }
            </form>
            {
                error && <Alert severity='error'>{error}</Alert>
            }
            {
                success && <Alert severity='success'>{success}</Alert>
            }
        </div>
    );
};

export default CheckoutForm;