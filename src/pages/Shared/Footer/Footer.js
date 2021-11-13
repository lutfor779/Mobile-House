import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import "./Footer.css";

const Footer = () => {
    return (
        <footer>
            <Box sx={{ px: 2, pb: 2, pt: 6, bgcolor: '#2876d2', color: 'white' }}>
                <Typography variant="h3" component="div" gutterBottom>Mobile House</Typography>
                <a href="https://mail.google.com/mail/u/0/#inbox?compose=new" target="_blank" rel="noreferrer">www.mdlrrahman779@gmail.com</a><br />

                <Typography variant="body2" gutterBottom>
                    Phone: 01793054198
                </Typography>
                <Typography variant="body2" gutterBottom sx={{ mb: 4 }}>Address: Dhaka-1230, Bangladesh</Typography>
                <hr />
                <Typography variant="caption" display="block" gutterBottom>
                    Copyright ©2021 All rights reserved | This template is made by Lutfor Rahman
                </Typography>
            </Box>
        </footer>
    );
};

export default Footer;