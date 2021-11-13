import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Container, Paper, Rating, Typography } from '@mui/material';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Reviews = () => {
    const [reviews, setReviews] = useState([]);

    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = reviews.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    useEffect(() => {
        fetch(`https://frozen-dusk-78727.herokuapp.com/reviews`)
            .then(res => res.json())
            .then(data => {
                setReviews(data);
            })
    }, [])
    return (
        <Container>
            <Box sx={{ pb: 5 }}>
                <Typography variant="h4" gutterBottom component="div" sx={{ pt: 8, mb: 6, color: 'secondary.main' }}>
                    Our Clients Feedback
                </Typography>
                <Paper elevation={6} sx={{ maxWidth: 480, mx: 'auto' }}>
                    <Box sx={{ minWidth: 345, flexGrow: 1 }}>
                        <AutoPlaySwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={activeStep}
                            onChangeIndex={handleStepChange}
                            enableMouseEvents
                        >
                            {reviews.map((review, index) => (
                                <div key={index}>
                                    {Math.abs(activeStep - index) <= 2 ? (
                                        <Box>
                                            <Box
                                                component="div"
                                                sx={{
                                                    height: 120,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    minWidth: 345,
                                                    overflow: 'hidden',
                                                    bgcolor: 'lightcyan'
                                                }}
                                            >
                                                <Typography variant="h4" gutterBottom component="div" >{review.name}</Typography>

                                                <Typography variant="subtitle2" gutterBottom component="div">{review.email}</Typography>
                                            </Box>
                                            <Box
                                                component="div"
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    minWidth: 345,
                                                    overflow: 'hidden',
                                                    bgcolor: 'lightcyan',
                                                    paddingBottom: 2
                                                }}
                                            >
                                                <Rating value={parseInt(review.rating)} readOnly />
                                            </Box>
                                            <Box
                                                component="div"
                                                sx={{
                                                    height: 200,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    minWidth: 345,
                                                    overflow: 'hidden',
                                                    bgcolor: 'lightgoldenrodyellow'
                                                }}
                                            >
                                                <Typography variant="body2" gutterBottom>{review.comment}</Typography>
                                            </Box>
                                        </Box>
                                    ) : null}
                                </div>
                            ))}
                        </AutoPlaySwipeableViews>
                        <MobileStepper
                            steps={maxSteps}
                            position="static"
                            activeStep={activeStep}
                            nextButton={
                                <Button
                                    size="small"
                                    onClick={handleNext}
                                    disabled={activeStep === maxSteps - 1}
                                >
                                    Next
                                    {theme.direction === 'rtl' ? (
                                        <KeyboardArrowLeft />
                                    ) : (
                                        <KeyboardArrowRight />
                                    )}
                                </Button>
                            }
                            backButton={
                                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                    {theme.direction === 'rtl' ? (
                                        <KeyboardArrowRight />
                                    ) : (
                                        <KeyboardArrowLeft />
                                    )}
                                    Back
                                </Button>
                            }
                        />
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default Reviews;