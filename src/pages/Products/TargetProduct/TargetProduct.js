import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container, Rating } from '@mui/material';
import { Box } from '@mui/system';
import useAuth from '../../../hooks/useAuth';
import Navbar from '../../Shared/Navbar/Navbar/Navbar';
import { Link } from 'react-router-dom';

const TargetProduct = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5000/products/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [id]);

    const handleOrder = (id) => {
        const orderDetails = { name: user.displayName, email: user.email, orderId: id }
        fetch(`http://localhost:5000/orders`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
    }

    return (
        <div>
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
                            <Typography variant="body2" color="text.secondary">
                                {product.price}
                            </Typography>
                            <Rating name="read-only" value={parseFloat('4')} readOnly />
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
        </div>
    );
};

export default TargetProduct;