import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import useAuth from '../../../../hooks/useAuth';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));



const ManageProduct = ({ product, setIsUpdate, products, setProducts }) => {
    const { _id, img, name, price, detail } = product;
    const { admin } = useAuth();

    const defaultInfo = { name, img, price, detail };
    const [productInfo, setProductInfo] = useState(defaultInfo);

    const handleOnBlur = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newInfo = { ...productInfo };
        newInfo[field] = value;
        setProductInfo(newInfo);
    }

    const handleProductUpdate = (id) => {
        if (admin) {
            fetch(`http://localhost:5000/products/${id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(productInfo)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.modifiedCount > 0) {
                        setIsUpdate(true);
                        alert('Update product');
                    }
                })
        }
        else {
            alert('Permission Denied.')
        }
    }


    const handleDelete = (id) => {
        const result = window.confirm('Want to remove this item?');

        if (result) {
            fetch(`http://localhost:5000/products/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount) {
                        const remaining = products.filter(data => data._id !== id);
                        setProducts(remaining);
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
            <StyledTableCell>
                <TextField fullWidth
                    id="fullWidth"
                    defaultValue={name}
                    type="text"
                    name="name"
                    onBlur={handleOnBlur}
                />
            </StyledTableCell>

            <StyledTableCell>
                <TextField
                    fullWidth
                    id="fullWidth"
                    type="text"
                    name="detail"
                    defaultValue={detail}
                    onBlur={handleOnBlur}
                    multiline
                    rows={4}
                    variant="standard"
                />
            </StyledTableCell>

            <StyledTableCell>
                <TextField
                    type="number"
                    defaultValue={price}
                    name="price"
                    onBlur={handleOnBlur} />
            </StyledTableCell>

            <StyledTableCell>
                <Button variant="contained"
                    size="small"
                    onClick={() => handleProductUpdate(_id)}
                >
                    Update
                </Button>
            </StyledTableCell>

            <StyledTableCell>
                <Button variant="outlined"
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

export default ManageProduct;