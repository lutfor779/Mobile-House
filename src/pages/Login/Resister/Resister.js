import React, { useState } from 'react';
import { Alert, Button, Container, TextField, Typography } from '@mui/material';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import useAuth from '../../../hooks/useAuth';
import { Box } from '@mui/system';


const Resister = () => {
    const [registrationData, setRegistrationData] = useState({});
    const { user, resisterUser, isLoading, error, signInWithGoogle } = useAuth();

    const location = useLocation();
    const history = useHistory();

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLogInData = { ...registrationData };
        newLogInData[field] = value;
        setRegistrationData(newLogInData);
    }

    const handleRegistrationSubmit = (e) => {
        e.preventDefault();
        if (registrationData.password !== registrationData.confirmPassword) {
            alert("Password did not match");
            return
        }
        resisterUser(registrationData.email, registrationData.confirmPassword, registrationData.name, location, history);
    }

    return (
        <Container>
            <Box sx={{ minWidth: 375, maxWidth: 480, mx: 'auto' }}>
                <Typography variant="body1" gutterBottom>Resister</Typography>

                {!isLoading && <form onSubmit={handleRegistrationSubmit} >
                    <TextField id="standard-basic"
                        sx={{ width: "100%", m: 1 }}
                        label="Your Name"
                        type="text"
                        name='name'
                        onBlur={handleOnBlur}
                        variant="standard"
                        required />

                    <TextField id="standard-basic"
                        sx={{ width: "100%", m: 1 }}
                        label="Your Email"
                        type="email"
                        name='email'
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

                    <TextField id="standard-basic"
                        label="Retype Your Password"
                        sx={{ width: "100%", m: 1 }}
                        type="password"
                        name='confirmPassword'
                        onBlur={handleOnBlur}
                        variant="standard"
                        required />

                    {error && <Alert severity="error">{error}</Alert>
                    }

                    <Button variant="contained"
                        sx={{ width: '100%', m: 1 }}
                        type="submit" >Resister</Button>

                    <NavLink to="/login"
                        style={{ textDecoration: "none" }}>
                        <Button variant="text">Already have an account? Login Here</Button>
                    </NavLink>
                </form>}
                <Button variant="contained"
                    sx={{ width: '100%', m: 1 }}
                    onClick={() => signInWithGoogle(location, history)} >Google Login</Button>
                {isLoading && <CircularProgress />
                }

                {user.email && <Alert severity="success">Registration Successfully</Alert>
                }


            </Box>
        </Container>
    );
};

export default Resister;