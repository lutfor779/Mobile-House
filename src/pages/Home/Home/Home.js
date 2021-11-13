import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Footer from '../../Shared/Footer/Footer';
import Banner from '../Banner/Banner';
import ExtraSection from '../ExtraSetction/ExtraSection';
import Header from '../Header/Header';
import HomeProducts from '../HomeProducts/HomeProducts';
import Reviews from '../Reviews/Reviews/Reviews';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://frozen-dusk-78727.herokuapp.com/products`)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            });
    }, []);
    return (
        <div>
            {
                loading ? <Box><h1>Loading</h1>
                    <CircularProgress />
                </Box> : <Box>
                    <Header />
                    <Banner />
                    <HomeProducts products={products.slice(0, 6)} />
                    <Reviews />
                    <ExtraSection />
                    <Footer />
                </Box>
            }
        </div>
    );
};

export default Home;