import { Button, TextField } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const MakeAdmin = () => {
    const [email, setEmail] = useState('');
    const { admin } = useAuth();

    const handleOnBlur = e => {
        setEmail(e.target.value);
    }

    const handleAdminSubmit = e => {
        e.preventDefault();
        if (admin) {
            console.log('can');
            const user = { email };
            fetch(`http://localhost:5000/users/admin`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(user)
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
            console.log('not')
            alert('You Do NOT Have Permission To MAKE ADMIN');
            e.target.reset();
        }
    }
    return (
        <div>
            <h2>Make an Admin</h2>
            <form onSubmit={handleAdminSubmit}>
                <TextField label="Email"
                    sx={{ minWidth: 345, width: '50%', mb: 2 }}
                    type="email"
                    onBlur={handleOnBlur}
                    variant="standard" />
                <br />
                <Button type="submit" variant="contained">Make Admin</Button>
            </form>
        </div>
    );
};

export default MakeAdmin;