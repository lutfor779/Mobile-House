import { Button } from '@mui/material';
import React from 'react';
import { useHistory, useLocation } from 'react-router';
import useAuth from '../../../hooks/useAuth';

const Login = () => {
    const { signInWithGoogle } = useAuth();

    const location = useLocation();
    const history = useHistory();


    return (
        <div>
            <h2>Login</h2>
            <Button onClick={() => signInWithGoogle(location, history)
            } variant="contained" >Google Login</Button>
        </div>
    );
};

export default Login;