import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useHistory } from 'react-router';

const ExtraSection = () => {
    const history = useHistory();
    return (
        <Box
            component="div"
            sx={{
                height: 700,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                bgcolor: 'black',
                color: 'white'
            }}
        >
            <Box
                component="div"
                sx={{ maxWidth: "900px", px: 3 }}
            >
                <Box sx={{ mb: 6 }}>
                    <Typography variant="button" display="block" gutterBottom>
                        Enjoy our Service
                    </Typography>

                    <Typography variant="h4" component="div">
                        UNBEATABLE PRICE, AND IT'S SUPER COMFORTABLE
                    </Typography>
                </Box>

                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }} sx={{ alignItems: 'center' }}>
                    <Grid item xs={12} sm={12} md={6} >
                        <img src="https://i.cdn.newsbytesapp.com/images/l142_5951592045581.jpg" alt="img" width="100%" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} >
                        <Typography variant="h6" display="block" gutterBottom>
                            We are here to provide our best services to you. <br />
                            Be our client and enjoy fastest service and good products.
                        </Typography>
                        <br />
                        <Button variant="contained" onClick={() => history.push('/products')}>Explore</Button>

                    </Grid>
                </Grid>
            </Box>
        </Box >
    );
};

export default ExtraSection;