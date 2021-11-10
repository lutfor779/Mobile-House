import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import Shop2Icon from '@mui/icons-material/Shop2';

export default function Navbar() {
    const { user, logOut } = useAuth();
    const [state, setState] = React.useState({ left: false });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer('left', false)}
            onKeyDown={toggleDrawer('left', false)}
        >
            <List>
                <ListItem button >
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <Link to="/home" style={{ textDecoration: 'none' }}><ListItemText primary="Home" /></Link>
                </ListItem>
                <ListItem button >
                    <ListItemIcon>
                        <Shop2Icon />
                    </ListItemIcon>
                    <Link to="/products" style={{ textDecoration: 'none' }}><ListItemText primary="Products" /></Link>
                </ListItem>
            </List>
            <Divider />

        </Box>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='sticky'>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer('left', true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Drawer
                        anchor={'left'}
                        open={state['left']}
                        onClose={toggleDrawer('left', false)}
                    >
                        {list()}
                    </Drawer>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/home" style={{ textDecoration: 'none', color: 'white' }} >Mobile House</Link>
                    </Typography>

                    <Link to="/products" style={{ textDecoration: 'none', color: 'white' }}>
                        <Typography variant="button" display="block">
                            Product
                        </Typography>
                    </Link>


                    {
                        user.email ? <Button onClick={logOut} color="inherit"> Logout</Button> : <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>
                            <Button color="inherit" >Login</Button>
                        </Link>
                    }

                </Toolbar>
            </AppBar>
        </Box>
    );
}



// sdfdf;saldfkj