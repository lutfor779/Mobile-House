import { Button, Container, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import useAuth from '../../../../hooks/useAuth';

const AddProduct = () => {
    const { admin, isLoading } = useAuth();

    const [productData, setProductData] = useState({});

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newProductData = { ...productData };
        newProductData[field] = value;
        setProductData(newProductData);
    }

    const handleProductSubmit = (e) => {
        e.preventDefault();
        if (admin) {
            fetch('https://frozen-dusk-78727.herokuapp.com/products', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(productData)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        alert('Add Product Successfully');
                        e.target.reset();
                    }
                })
        }
        else {
            alert('Access Denied. You Do Not Have Permission.')
        }
    }

    return (
        <Container>
            <Box sx={{ minWidth: 375, maxWidth: 480, mx: 'auto' }}>
                <Typography variant="body1" gutterBottom>Add a product</Typography>

                {!isLoading && <form onSubmit={handleProductSubmit} >
                    <TextField id="standard-basic"
                        sx={{ width: "100%", m: 1 }}
                        label="Product Name"
                        type="text"
                        name='name'
                        onBlur={handleOnBlur}
                        variant="standard"
                        required />

                    <TextField id="standard-basic"
                        sx={{ width: "100%", m: 1 }}
                        label="Image URL"
                        type="text"
                        name='img'
                        onBlur={handleOnBlur}
                        variant="standard"
                        required />

                    <TextField id="standard-basic"
                        sx={{ width: "100%", m: 1 }}
                        label="Product Detail"
                        type="text"
                        name='detail'
                        onBlur={handleOnBlur}
                        variant="standard"
                        required />

                    <TextField id="standard-basic"
                        label="Product Price"
                        sx={{ width: "100%", m: 1 }}
                        type="number"
                        name='price'
                        onBlur={handleOnBlur}
                        variant="standard"
                        required />

                    <Button variant="contained"
                        sx={{ width: '100%', m: 1 }}
                        type="submit"
                    >Add Product
                    </Button>
                </form>}



            </Box>
        </Container>
    );
};

export default AddProduct;