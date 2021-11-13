import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import Product from '../Product/Product';
import Navbar from '../../Shared/Navbar/Navbar/Navbar';
import Footer from '../../Shared/Footer/Footer';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://frozen-dusk-78727.herokuapp.com/products`)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            {
                loading ? <Box>
                    <h1>Loading</h1>
                </Box> : <Box>
                    <Navbar />
                    <Container style={{ margin: '3rem auto' }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
                                {
                                    products.map(product => <Product key={product._id} product={product} />)
                                }
                            </Grid>
                        </Box>
                    </Container>
                    <Footer />
                </Box>
            }
        </div>
    );
};

export default Products;