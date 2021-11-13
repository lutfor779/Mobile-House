import { Button, Container, Paper, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useState } from 'react';
import useAuth from '../../../../hooks/useAuth';


const MakeAdmin = () => {
    const [email, setEmail] = useState('');
    const [users, setUsers] = useState([]);
    const { admin } = useAuth();

    const handleOnBlur = e => {
        setEmail(e.target.value);
    }

    useEffect(() => {
        fetch(`https://frozen-dusk-78727.herokuapp.com/users`)
            .then(res => res.json())
            .then(data => {
                setUsers(data);
            });
    }, []);


    const handleAdminSubmit = e => {
        e.preventDefault();
        if (admin) {
            const isValid = users.find(user => user.email === email);

            if (isValid) {
                const userEmail = { email };
                fetch(`https://frozen-dusk-78727.herokuapp.com/users/admin`, {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(userEmail)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.modifiedCount) {
                            alert('Admin successfully made');
                            e.target.reset();
                        }
                    })
            }
            else {
                alert('Not A Valid User. Try Right Email.')
                e.target.reset();
            }
        }
        else {
            alert('You Do NOT Have Permission To MAKE ADMIN');
            e.target.reset();
        }
    }
    return (
        <Container>
            <Typography variant="h4" gutterBottom sx={{ mt: 8, mb: 4, color: 'secondary.main' }}>Make User as Admin </Typography>
            <Box sx={{ minWidth: 345, maxWidth: 480, mx: 'auto' }}>
                <Paper elevation={6} sx={{ px: 2, py: 3 }}>
                    <form onSubmit={handleAdminSubmit}>
                        <TextField label="Email"
                            sx={{ width: '90%', mb: 2 }}
                            type="email"
                            onBlur={handleOnBlur}
                            variant="standard" />
                        <br />
                        <Button type="submit" variant="contained">Make Admin</Button>
                    </form>
                </Paper>
            </Box>
        </Container>
    );
};

export default MakeAdmin;