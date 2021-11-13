import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Alert, AlertTitle, Button, CircularProgress, Container } from '@mui/material';
import useAuth from '../../../../hooks/useAuth';
import Order from '../Order/Order';
import { Box } from '@mui/system';
import { useHistory } from 'react-router';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));


const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    const history = useHistory();

    useEffect(() => {
        const getOrders = () => {
            fetch(`https://frozen-dusk-78727.herokuapp.com/orders?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setOrders(data);
                    setLoading(false);
                })
        }
        return getOrders();
    }, [user.email]);


    const handleClick = () => {
        history.push('/products');
    }

    return (
        <div>
            {
                loading ? <Box><h1>Loading</h1>
                    <CircularProgress />
                </Box> : <Box>
                    <h3>{user.displayName}</h3>
                    <Container>
                        {
                            orders.length > 0 ? <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700, maxWidth: 900, mx: 'auto' }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>Item</StyledTableCell>
                                            <StyledTableCell>Name</StyledTableCell>
                                            <StyledTableCell>Email</StyledTableCell>
                                            <StyledTableCell>Price</StyledTableCell>
                                            <StyledTableCell>Status</StyledTableCell>
                                            <StyledTableCell>Delete</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            orders.map(order => <Order key={order._id} order={order} orders={orders} setOrders={setOrders} />)
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer> : <Box>
                                <Alert severity="warning"
                                    action={
                                        <Button color="primary"
                                            size="small"
                                            variant="outlined"
                                            onClick={handleClick}
                                        >
                                            Order
                                        </Button>
                                    }
                                >
                                    <AlertTitle>You have to order first — check it out!</AlertTitle>
                                </Alert>
                            </Box>
                        }
                    </Container>
                </Box>
            }
        </div>
    );
};

export default MyOrders;