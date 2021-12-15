import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import { Box } from '@mui/system';
import useAuth from '../../../hooks/useAuth';
import Navbar from '../../Shared/Navbar/Navbar/Navbar';
import { Link } from 'react-router-dom';

const TargetProduct = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);

    const history = useHistory();

    useEffect(() => {
        fetch(`https://frozen-dusk-78727.herokuapp.com/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
    }, [id]);

    const handleOrder = (id) => {
        const orderDetails = {
            orderId: id,
            name: user.displayName,
            email: user.email,
            status: 'Pending',
            price: product.price
        }
        fetch(`https://frozen-dusk-78727.herokuapp.com/orders`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('Order Successful');
                    history.push('/products');
                }
            });
    }

    return (
        <div>
            {
                loading ? <Box>
                    <h1>Loading</h1>
                </Box> : <Box>
                    <Navbar />
                    <Container>
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="h4" gutterBottom component="div">
                                {user.displayName}
                            </Typography>
                            <Typography variant="subtitle2" display="block" gutterBottom>
                                {user.email}
                            </Typography>


                            <Card sx={{ minWidth: 300, maxWidth: 480, my: 3, mx: 'auto' }} elevation={6}>
                                <CardMedia
                                    component="img"
                                    alt={product.name}
                                    image={product.img}
                                />

                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {product.name}
                                    </Typography>

                                    <Typography variant="body2" gutterBottom component="div">
                                        {product.detail}
                                    </Typography>

                                    <br />
                                    <Typography variant="h6" color="warning.main">
                                        BDT {product.price}
                                    </Typography>
                                </CardContent>

                                <CardActions sx={{ justifyContent: 'center' }}>
                                    <Button variant="contained"
                                        sx={{ px: 3, mb: 2 }}
                                        onClick={() => handleOrder(product._id)}
                                    >Buy Now</Button>
                                </CardActions>
                            </Card>
                            <Link to="/products" style={{ textDecoration: 'none', color: 'white' }}>
                                <Button variant="outlined"
                                    size="small"
                                    sx={{ px: 3, mb: 2 }}
                                >Back</Button>
                            </Link>
                        </Box>
                    </Container>
                </Box>
            }
        </div>
    );
};

export default TargetProduct;