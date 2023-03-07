import React from 'react'
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Image from 'mui-image';
import { ArrowForward } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ReactiveComputerHero from "../../../img/ReactiveComputerHero.png"
import ReactiveLogo from "../../../img/ReactiveLogo.png"

export const Hero = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ display: 'flex', alignContent: 'center', flexWrap: 'wrap', height: '90vh' }}>
            <Container>
                <Grid container >
                    <Grid item xs={12} lg={6} sx={{ display: 'flex', alignContent: 'center', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                        <Box sx={{ textAlign: 'justify' }}>
                            <Box component="img" sx={{ width: "50px" }} src={ReactiveLogo}></Box>
                            <Typography variant="h1" sx={{ fontWeight: 800, color: '#D3D3D3', fontSize: { xs: '4.2rem', md: '6.5rem' } }}>
                                Collab with<br />
                                <p style={{ display: 'inline', color: '#a266e2' }}>React </p>
                                Devs
                            </Typography>
                            <Typography color="gray1" variant="h6" textAlign="justify" >Save time, be Reactive - A social network for developers</Typography>
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'space-between', mt: 3 }}>
                                <Button href="#features" sx={{ width: '40%' }} variant='outlined' color="secondary" >Learn More</Button>
                                <Typography>or</Typography>
                                <Button sx={{ width: '40%' }} variant='contained' color="secondary" onClick={() => { navigate('/signup') }} endIcon={<ArrowForward />}>Get Started</Button>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item sx={{ display: { lg: 'flex', xs: 'none' } }} lg={6}>
                        <img src={ReactiveComputerHero} />
                    </Grid>
                </Grid>
            </Container>
        </Box >
    )
}
