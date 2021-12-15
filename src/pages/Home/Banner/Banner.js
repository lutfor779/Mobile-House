import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import banner1 from '../../../images/Banner/banner1.jpg';
import banner2 from '../../../images/Banner/banner2.jpg';
import banner3 from '../../../images/Banner/banner3.jpg';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
    {
        imgPath: banner1
    },
    {
        imgPath: banner2
    },
    {
        imgPath: banner3
    }
];

function Banner() {
    return (
        <Box sx={{ flexGrow: 1, mt: 8 }}>
            <AutoPlaySwipeableViews>
                {images.map((image, index) => <Box key={index}
                    component="img"
                    sx={{
                        height: 576,
                        display: 'block',
                        overflow: 'hidden',
                        width: '100%',
                    }}
                    src={image.imgPath}
                    alt="banner"
                />
                )}
            </AutoPlaySwipeableViews>
        </Box>
    );
}

export default Banner;
