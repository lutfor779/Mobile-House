import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';
import ManageProduct from '../ManageProduct/ManageProduct';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
    useEffect(() => {
        fetch(`https://frozen-dusk-78727.herokuapp.com/products`)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
            });
    }, [isUpdate, setProducts]);
    return (
        <Box>
            <Container>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700, mx: 'auto' }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Item</StyledTableCell>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell>Detail</StyledTableCell>
                                <StyledTableCell>Price</StyledTableCell>
                                <StyledTableCell>Update</StyledTableCell>
                                <StyledTableCell>Delete</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                products.map(product => <ManageProduct key={product._id} product={product} setIsUpdate={setIsUpdate} products={products} setProducts={setProducts} />)
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Box>
    );
};

export default ManageProducts;