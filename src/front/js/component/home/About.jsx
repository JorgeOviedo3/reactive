import { GitHub, LinkedIn } from '@mui/icons-material'
import { Avatar, Box, Button, IconButton, Paper, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'

export const About = () => {
    return (
        <Box sx={{ my: 10 }}>
            <Container sx={{ height: '100%' }}>
                <Typography variant="h2">About</Typography>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, mt: 2, gap: 2 }}>
                    <Paper elevation={10} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 3 }} >
                        <Avatar sx={{ width: '200px', height: '200px', mb: 2 }} src="https://cdn.discordapp.com/attachments/865816064298188833/1084942333134504057/107929074.png" />
                        <Typography variant="h6" textAlign={'center'}>Jorge Oviedo</Typography>
                        <Typography>"Not a mage, just a coder."</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mt: 1 }}>
                            <a target="_blank" href="https://www.linkedin.com/in/jorge-oviedo-a41795233/"><IconButton><LinkedIn color="primary" /></IconButton></a>
                            <a target="_blank" href="https://github.com/JorgeOviedo3"><IconButton><GitHub color="secondary" /></IconButton></a>
                        </Box>
                    </Paper>
                    <Paper sx={{ p: 3, display: 'flex', justifyContent: 'space-around', alignItems: 'start', flexDirection: 'column', }}>
                        <Typography variant="h3">Our Mission</Typography>
                        <Typography color="subtlegray.lighter" textAlign="justify" sx={{ fontSize: '1.2rem' }}>Reactive is a social network for React developers, designed to facilitate the sharing of code snippets and components. Our mission is to create a strong and supportive community of React developers, who can come together to exchange knowledge, collaborate on projects, and solve problems. Through Reactive, we hope to foster a culture of innovation, creativity, and learning, enabling developers to build better React applications faster. If you've come this far thank you for trying this website I hope you find what you're looking for and don't forget to help.</Typography>

                    </Paper>
                </Box>
            </Container >
        </Box >
    )
}
