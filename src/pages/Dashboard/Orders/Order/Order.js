import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import useAuth from '../../../../hooks/useAuth';

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
    const { admin } = useAuth();

    const [condition, setCondition] = useState(status);

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

    const handleStatus = (id) => {
        if (admin) {
            const updateStatus = { status: 'Approved' };

            fetch(`http://localhost:5000/orders/${id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(updateStatus)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.modifiedCount > 0) {
                        setCondition('Approved');
                        alert('Product Status Set To Approved');
                    }
                })
        }
        else {
            alert('Access Denied. You Do Not Have Permission.');
        }
    }

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
            <StyledTableCell>
                {
                    condition === "Pending" && admin ? <Button onClick={() => handleStatus(_id)} color="secondary">{condition}</Button> : <Button color="secondary">{condition}</Button>
                }
            </StyledTableCell>
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