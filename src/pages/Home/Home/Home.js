import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Banner from '../Banner/Banner';
import ExtraSection from '../ExtraSetction/ExtraSection';
import Header from '../Header/Header';
import HomeProducts from '../HomeProducts/HomeProducts';
import Reviews from '../Reviews/Reviews/Reviews';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5000/products`)
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
                </Box> : <Box>
                    <Header />
                    <Banner />
                    <HomeProducts products={products.slice(0, 6)} />
                    <Reviews />
                    <ExtraSection />
                </Box>
            }
        </div>
    );
};

export default Home;