import { Alert, Button, CircularProgress, Container, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Login = () => {
    const [loginData, setLoginData] = useState({});
    const { user, error, setError, signInWithGoogle, signInWithEmailPassword, isLoading } = useAuth();

    const location = useLocation();
    const history = useHistory();

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLogInData = { ...loginData };
        newLogInData[field] = value;
        setError('')
        setLoginData(newLogInData);
    }

    const handleLoginSubmit = (e) => {
        signInWithEmailPassword(loginData.email, loginData.password, location, history);
        e.preventDefault();
    }


    return (
        <Container>
            <Typography variant="body1" gutterBottom>Login</Typography>
            <Box sx={{ minWidth: 375, maxWidth: 480, mx: 'auto' }}>
                {<form onSubmit={handleLoginSubmit} >
                    <TextField id="standard-basic"
                        sx={{ width: "100%", m: 1 }}
                        label="Your Email"
                        type="email"
                        name="email"
                        onBlur={handleOnBlur}
                        variant="standard"
                        required />

                    <TextField id="standard-basic"
                        label="Your Password"
                        sx={{ width: "100%", m: 1 }}
                        type="password"
                        name='password'
                        onBlur={handleOnBlur}
                        variant="standard"
                        required />
                    {error && <Alert severity="error">{error}</Alert>
                    }
                    <Button variant="contained"
                        sx={{ width: '100%', m: 1 }}
                        type="submit" >Login</Button>
                    <Link to="/resister"
                        style={{ textDecoration: "none" }}>
                        <Button variant="text">New User? Please Resister.</Button>
                    </Link>
                </form>}
                <Button variant="contained"
                    sx={{ width: '100%', m: 1 }}
                    onClick={() => signInWithGoogle(location, history)} >Google Login</Button>

                {isLoading && <CircularProgress />
                }
                {user.email && <Alert severity="success">Login Successfully</Alert>
                }

            </Box>
        </Container>
    );
};

export default Login;