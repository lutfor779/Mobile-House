import { Container, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe('pk_test_51K4pT4LGvHgzKBJIMjTj2gzH9XtpoNNSlYzLYjLrV89IwZluJEYZgL4rBHGiKkz4j9c9Tdx5wsTiT4GuaV22Ybpc006w1gknwt');




const Pay = () => {
    const [bill, setBill] = useState(0);
    const [orders, setOrders] = useState()
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();


    useEffect(() => {
        const getOrders = () => {
            fetch(`https://frozen-dusk-78727.herokuapp.com/orders?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setOrders(data);
                    setLoading(false);
                    let total = 0;
                    data.map(product => total += parseInt(product?.price));
                    setBill(total);
                })
        }
        return getOrders();
    }, [user.email]);

    return (
        <Container>
            <Box sx={{ minWidth: 345, maxWidth: 580, alignItems: 'center', mt: 8, mx: 'auto' }}>
                <Paper elevation={6} sx={{ px: 2, py: 3 }}>
                    <Typography variant="h4" gutterBottom sx={{ my: 4, color: 'secondary.main' }}>
                        Payment Here
                    </Typography>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm bill={bill} orders={orders} />
                    </Elements>
                </Paper>
            </Box>
        </Container>
    );
};

export default Pay;