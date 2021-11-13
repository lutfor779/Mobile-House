import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const Pay = () => {
    return (
        <Box sx={{ minWidth: 345, maxWidth: 480, alignItems: 'center', mt: 8, mx: 'auto' }}>
            <Paper elevation={6} sx={{ px: 2, py: 3 }}>
                <Typography variant="h4" gutterBottom sx={{ mt: 8, mb: 4, color: 'secondary.main' }}>
                    Payment system coming soon...
                </Typography>
                <Typography variant="h4" gutterBottom sx={{ mt: 8, mb: 4, color: 'secondary.main' }}>
                    Payment system coming soon... we are ready for you
                </Typography>
            </Paper>
        </Box>
    );
};

export default Pay;