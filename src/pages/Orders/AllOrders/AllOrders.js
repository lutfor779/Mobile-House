import React, { useEffect, useState } from 'react';
import Order from '../Order/Order';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';
import Navbar from '../../Shared/Navbar/Navbar/Navbar';

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
        fetch('http://localhost:5000/orders')
            .then(res => res.json())
            .then(data => {
                setOrders(data)
            });
    }, [])
    // console.log(orders)
    return (
        <div>
            <Navbar />
            <h3>All order {orders.length}</h3>
            <Container>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Item</StyledTableCell>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell>Email</StyledTableCell>
                                <StyledTableCell>Price</StyledTableCell>
                                <StyledTableCell>Status</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                orders.map(order => <Order key={order._id} order={order} />)
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </div>
    );
};

export default AllOrders;