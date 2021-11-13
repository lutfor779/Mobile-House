import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Alert, AlertTitle, Container } from '@mui/material';
import Order from '../../Orders/Order/Order';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));


const AllOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrders = () => {
            fetch('https://frozen-dusk-78727.herokuapp.com/orders')
                .then(res => res.json())
                .then(data => {
                    setOrders(data)
                });
        }
        return getOrders();
    }, []);

    return (
        <div>
            <h3>All order {orders.length}</h3>
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
                    </TableContainer> : <Alert severity="warning">
                        <AlertTitle>Currently We Have No Order!</AlertTitle>
                    </Alert>
                }
            </Container>
        </div>
    );
};

export default AllOrders;