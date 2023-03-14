import { Login } from '@mui/icons-material'
import { Box, Container, IconButton, Paper, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

import ReactiveLogoWhite from "../../../img/ReactiveLogoWhite.png"

export const JoinNow = () => {

    return (
        <Box sx={{ my: { xs: 4, md: 15 } }}>
            <Container sx={{ height: '100%' }}>
                <Paper elevation={10} sx={{ width: '100%', background: 'radial-gradient(circle, rgba(128,145,252,1) 68%, rgba(83,68,253,1) 100%)', borderRadius: 5, p: 3, transition: '0.3s', "&:hover": { transform: 'scale(1.05)', transition: '0.3s' } }}>
                    <Box>
                        <Box component="img" sx={{ width: '50px' }} src={ReactiveLogoWhite}></Box>
                        <Typography variant="h2" sx={{ fontWeight: 500, fontSize: { xs: '40px', md: '3.75rem' } }}>Sign up now and start building your network today!</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                        <Link to="/signup"><IconButton ><Login sx={{ width: '40px', height: '40px' }} /></IconButton></Link>
                    </Box>
                </Paper >
            </Container >
        </Box >
    )
}
