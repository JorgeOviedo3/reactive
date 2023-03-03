import { Box, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'

export const About = () => {
    return (
        <Box sx={{ height: '10vh' }}>
            <Container sx={{ background: '#33DDF6', height: '100%' }}>
                <Typography variant="h2">About</Typography>
            </Container>
        </Box>
    )
}
