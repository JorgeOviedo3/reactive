import { ArrowCircleRight } from '@mui/icons-material'
import { Box, Button, Container, IconButton, Paper, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

import ReactiveLogoWhite from "../../../img/ReactiveLogoWhite.png"



export const JoinNow = () => {

    return (
        <Box sx={{}}>
            <Container sx={{ height: '100%' }}>
                <Paper elevation={10} sx={{ width: '100%', background: '#8091fc', borderRadius: 5, p: 3 }}>
                    <Box>
                        <Box component="img" sx={{ width: '50px' }} src={ReactiveLogoWhite}></Box>
                        <Typography variant="h2" sx={{ fontWeight: 500, fontSize: { xs: '40px', md: '3.75rem' } }}>What are you waiting for?</Typography>
                    </Box>
                    <Link to="/signup"><Button sx={{ mt: 2 }} variant="outlined" color="clear">Join us now</Button></Link>
                </Paper >
            </Container >
        </Box >
    )
}
