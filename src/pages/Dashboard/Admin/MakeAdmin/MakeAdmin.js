import { Button, TextField } from '@mui/material';
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
        fetch(`http://localhost:5000/users`)
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
                fetch(`http://localhost:5000/users/admin`, {
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