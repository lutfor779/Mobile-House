import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import OrderStatus from '../Admin/OrderStatus/OrderStatus';

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

const Order = ({ order }) => {
    const { orderId, name, email } = order;
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

    return (
        <StyledTableRow>
            <StyledTableCell component="th" scope="row">
                <img src={img} alt={product.name} height="60px" width="100%" />
            </StyledTableCell>
            <StyledTableCell>{name}</StyledTableCell>
            <StyledTableCell>{email}</StyledTableCell>
            <StyledTableCell>{price}</StyledTableCell>
            <StyledTableCell><OrderStatus></OrderStatus></StyledTableCell>
        </StyledTableRow>
    );
};

export default Order;