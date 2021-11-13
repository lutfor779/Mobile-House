import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const DashboardHome = () => {
    return (
        <Container>
            <Box
                component="div"
                sx={{
                    // height: 345,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    bgcolor: 'darkblue',
                    color: 'white',
                    p: 8,
                    mt: 8
                }}
            >
                <Box>
                    <div>
                        <Typography variant="h4" gutterBottom component="div">
                            WELCOME TO MOBILE HOUSE.
                            <br />
                            WE'RE HERE FOR PROVIDE THE BEST QUALITY AND UNBELIEVABLE PRICE.
                        </Typography>
                        <br />
                        <Typography variant="subtitle2" gutterBottom component="div">
                            ALWAYS ON YOUR SIDE.  BE HAPPY AND ENJOY SHOPPING.
                        </Typography>
                    </div>
                </Box>
            </Box>
        </Container>
    );
};

export default DashboardHome;