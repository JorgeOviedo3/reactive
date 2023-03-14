import { ArrowCircleRight } from '@mui/icons-material'
import { Box, Button, Container, IconButton, Paper, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

import ReactiveLogoWhite from "../../../img/ReactiveLogoWhite.png"



export const Features = () => {

    return (
        <Box sx={{ mt: "-120px", pt: "120px" }} id="features">
            <Container sx={{ height: '100%' }}>
                <Paper elevation={10} sx={{ width: '100%', background: '#a266e2', borderRadius: 5, p: 3 }}>
                    <Box>
                        <Box component="img" sx={{ width: '50px' }} src={ReactiveLogoWhite}></Box>
                        <Typography variant="h2" sx={{ fontWeight: 500, fontSize: { xs: '40px', md: '3.75rem' } }}>An awesome place where your code can be seen</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                        <Link to='/feed'><IconButton><ArrowCircleRight sx={{ width: '40px', height: '40px' }} /></IconButton></Link>

                    </Box>
                </Paper >
            </Container >
        </Box >
    )
}
