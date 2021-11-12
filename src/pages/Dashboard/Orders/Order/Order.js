import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Order = ({ order, orders, setOrders }) => {
    const { _id, orderId, name, email, status } = order;
    const [product, setProduct] = useState({});
    const { img, price } = product;

    useEffect(() => {
        const getProduct = () => {
            fetch(`http://localhost:5000/products/${orderId}`)
                .then(res => res.json())
                .then(data => {
                    setProduct(data);
                })
        }
        return getProduct();
    }, [orderId]);


    const handleDelete = (id) => {
        const result = window.confirm('Want to remove this item?');

        if (result) {
            fetch(`http://localhost:5000/orders/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount) {
                        const remaining = orders.filter(order => order._id !== id);
                        setOrders(remaining);
                        alert('Deleted successfully');
                    }
                })
        }
    }

    return (
        <StyledTableRow>
            <StyledTableCell component="th" scope="row">
                <img src={img} alt={product.name} height="60px" width="100%" />
            </StyledTableCell>
            <StyledTableCell>{name}</StyledTableCell>
            <StyledTableCell>{email}</StyledTableCell>
            <StyledTableCell>{price}</StyledTableCell>
            <StyledTableCell>{status}</StyledTableCell>
            <StyledTableCell>
                <Button variant="contained"
                    size="small"
                    color="error"
                    onClick={() => handleDelete(_id)}
                >
                    Delete
                </Button>
            </StyledTableCell>
        </StyledTableRow>
    );
};

export default Order;