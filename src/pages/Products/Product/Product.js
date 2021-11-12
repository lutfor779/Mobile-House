import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
    const { _id, name, img, price } = product;

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345 }} elevation={4}>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="auto"
                    image={img}
                />

                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {name.slice(0, 25).trim()}{name.length > 25 && '...'}
                    </Typography>
                    <br />
                    <Typography variant="button" color="warning.main">
                        BDT {price}
                    </Typography>
                </CardContent>

                <CardActions sx={{ justifyContent: 'center' }}>
                    <Link to={`/product/${_id}`}
                        style={{ textDecoration: 'none' }}>
                        <Button variant="contained" size="small" sx={{ px: 3, mb: 2 }}>View Details</Button>
                    </Link>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default Product;