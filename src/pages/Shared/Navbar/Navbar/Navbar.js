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
import LocalMallIcon from '@mui/icons-material/LocalMall';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import DashboardIcon from '@mui/icons-material/Dashboard';

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
                <Link to="/home" style={{ textDecoration: 'none' }}>
                    <ListItem button >
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                </Link>
                <Link to="/products" style={{ textDecoration: 'none' }}>
                    <ListItem button >
                        <ListItemIcon>
                            <LocalMallIcon />
                        </ListItemIcon>
                        <ListItemText primary="Products" />
                    </ListItem>
                </Link>
                <Link to="/myOrders" style={{ textDecoration: 'none' }}>
                    <ListItem button >
                        <ListItemIcon>
                            <ShoppingCartIcon />
                        </ListItemIcon>
                        <ListItemText primary="My Orders" />
                    </ListItem>
                </Link >
                <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                    <ListItem button >
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                </Link >
                <Link to="/allOrders" style={{ textDecoration: 'none' }}>
                    <ListItem button >
                        <ListItemIcon>
                            <ShoppingBasketIcon />
                        </ListItemIcon>
                        <ListItemText primary="All Orders" />
                    </ListItem>
                </Link >
            </List>
            <Divider />
        </Box>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='fixed'>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2, display: { sm: 'none' } }}
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

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
                        <Link to="/home" style={{ textDecoration: 'none', color: 'white' }} >Mobile House</Link>
                    </Typography>

                    <Link to="/products" style={{ textDecoration: 'none', color: 'white' }}>
                        <Typography variant="button" display="block" >
                            Products
                        </Typography>
                    </Link>

                    {
                        user.email && <span>
                            <Link to="/dashboard" style={{ textDecoration: 'none', color: 'white' }}>
                                <Typography variant="button" display="block" sx={{ ml: 1 }}>
                                    Dashboard
                                </Typography>
                            </Link>
                        </span>
                    }

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