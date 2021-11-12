import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import useAuth from '../../../hooks/useAuth';
import AdminRoute from '../../Login/Admin/AdminRoute/AdminRoute';
import MyOrders from '../Orders/MyOrders/MyOrders';
import { Button, List } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AllOrders from '../Admin/AllOrders/AllOrders';
import MakeAdmin from '../Admin/MakeAdmin/MakeAdmin';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddProduct from '../Admin/AddProduct/AddProduct';
import UpdateIcon from '@mui/icons-material/Update';
import ManageProducts from '../Admin/ManageProducts/ManageProducts';


const Dashboard = () => {
    const { user, admin, logOut } = useAuth();
    const [state, setState] = React.useState({ left: false });

    let { path, url } = useRouteMatch();

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
                {
                    admin ? <Box>
                        <Link to="/home" style={{ textDecoration: 'none' }}>
                            <ListItem button >
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Home" />
                            </ListItem>
                        </Link>

                        <Link to={`${url}/makeAdmin`} style={{ textDecoration: 'none' }}>
                            <ListItem button >
                                <ListItemIcon>
                                    <AddModeratorIcon />
                                </ListItemIcon>
                                <ListItemText primary="Make Admin" />
                            </ListItem>
                        </Link>

                        <Link to={`${url}/allOrders`} style={{ textDecoration: 'none' }}>
                            <ListItem button >
                                <ListItemIcon>
                                    <ShoppingBagIcon />
                                </ListItemIcon>
                                <ListItemText primary="All Orders" />
                            </ListItem>
                        </Link>

                        <Link to={`${url}/addProduct`} style={{ textDecoration: 'none' }}>
                            <ListItem button >
                                <ListItemIcon>
                                    <AddBoxIcon />
                                </ListItemIcon>
                                <ListItemText primary="Add Product" />
                            </ListItem>
                        </Link>

                        <Link to={`${url}/manageProducts`} style={{ textDecoration: 'none' }}>
                            <ListItem button >
                                <ListItemIcon>
                                    <UpdateIcon />
                                </ListItemIcon>
                                <ListItemText primary="Manage Products" />
                            </ListItem>
                        </Link>
                    </Box> : <Box>
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
                        <Link to={`${url}`} style={{ textDecoration: 'none' }}>
                            <ListItem button >
                                <ListItemIcon>
                                    <DashboardIcon />
                                </ListItemIcon>
                                <ListItemText primary="Dashboard" />
                            </ListItem>
                        </Link>
                    </Box>
                }
            </List>

        </Box>
    );
    return (
        <div>
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

                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
                            Dashboard
                        </Typography>
                        {
                            user.email ? <Button onClick={logOut} color="inherit"> Logout</Button> : <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>
                                <Button color="inherit" >Login</Button>
                            </Link>
                        }
                    </Toolbar>
                </AppBar>
            </Box>

            <Box>
                <Switch>
                    <Route exact path={path}>
                        <MyOrders />
                    </Route>
                    <AdminRoute path={`${path}/allOrders`}>
                        <AllOrders />
                    </AdminRoute>
                    <AdminRoute path={`${path}/makeAdmin`}>
                        <MakeAdmin />
                    </AdminRoute>
                    <AdminRoute path={`${path}/addProduct`}>
                        <AddProduct />
                    </AdminRoute>
                    <AdminRoute path={`${path}/manageProducts`}>
                        <ManageProducts />
                    </AdminRoute>
                </Switch>
            </Box>
        </div>
    );
}

export default Dashboard;
