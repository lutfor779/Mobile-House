import { Button, Container, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useHistory } from 'react-router';
import Product from '../../Products/Product/Product';

const HomeProducts = ({ products }) => {
    const history = useHistory();

    return (
        <Container style={{ margin: '3rem auto' }}>
            <Typography variant="h4" gutterBottom component="div" sx={{ py: 8, color: 'secondary.main' }}>
                Our some products
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
                <Paper elevation={3} sx={{ p: 5 }}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
                        {
                            products.map(product => <Product key={product._id} product={product} />)
                        }
                    </Grid>
                    <br />
                    <br />
                    <br />
                    <Button variant="contained"
                        color="secondary"
                        onClick={() => history.push('/products')}
                        sx={{ px: 5 }}>See More</Button>
                </Paper>
            </Box>
        </Container>

    );
};

export default HomeProducts;