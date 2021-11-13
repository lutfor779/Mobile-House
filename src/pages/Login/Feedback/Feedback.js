import { Alert, Button, CircularProgress, Container, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import Navbar from '../../Shared/Navbar/Navbar/Navbar';

const Feedback = () => {
    const { user, isLoading } = useAuth();
    const [error, setError] = useState(false);
    const [feedback, setFeedback] = useState({});

    const handleOnBlur = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newInfo = { ...feedback };
        newInfo[field] = value;

        if (field === 'rating') {
            if (value > 5) {
                setError(true)
            }
            else {
                setError(false)
            }
        }
        setFeedback(newInfo);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const saveReview = {
            ...feedback,
            name: user.displayName,
            email: user.email
        }
        fetch(`http://localhost:5000/reviews`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(saveReview)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('Feedback added');
                    e.target.reset();
                }
            });
    }



    return (
        <div>
            <Navbar />
            <h3>Feedback</h3>
            {isLoading ? <CircularProgress /> : <Container>
                <Typography variant="body1" gutterBottom>Give Your Feedback</Typography>
                <Box sx={{ minWidth: 375, maxWidth: 480, mx: 'auto' }}>
                    {<form onSubmit={handleSubmit} >
                        <TextField id="standard-basic"
                            sx={{ width: "100%", m: 1 }}
                            label="Name"
                            type="text"
                            name="name"
                            variant="standard"
                            defaultValue={user.displayName}
                            InputProps={{
                                readOnly: true,
                            }}
                            required />
                        <TextField id="standard-basic"
                            sx={{ width: "100%", m: 1 }}
                            label="Email"
                            type="email"
                            name="email"
                            variant="standard"
                            defaultValue={user.email}
                            InputProps={{
                                readOnly: true,
                            }}
                            required />

                        <TextField id="standard-basic"
                            label="Rating"
                            sx={{ width: "100%", m: 1 }}
                            type="number"
                            name='rating'
                            onBlur={handleOnBlur}
                            variant="standard"
                            placeholder="Insert 0 to 5"
                            required />

                        {
                            error && <Alert severity="error">Rating must be Less then or Equal 5</Alert>
                        }

                        <TextField id="standard-basic"
                            label="Comment"
                            sx={{ width: "100%", m: 1 }}
                            type="text"
                            name='comment'
                            onBlur={handleOnBlur}
                            variant="standard"
                            required />

                        <Button variant="contained"
                            sx={{ width: '100%', m: 1 }}
                            type="submit" >Submit</Button>

                    </form>}
                </Box>
            </Container>
            }
        </div>
    );
};

export default Feedback;