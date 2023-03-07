import { LanOutlined, LanRounded, ShareOutlined, ShareRounded, VolunteerActivismOutlined, VolunteerActivismRounded } from '@mui/icons-material'
import { Box, Container, Paper, Typography } from '@mui/material'
import React from 'react'

const details = [
    {
        title: 'Publish',
        description: 'Reactive allows you to share your React code snippets and components with other developers. This can help you get feedback on your code, find collaborators, or even attract potential employers',
        icon: <ShareOutlined color="secondary" sx={{ transform: 'scale(4)', my: 7 }}></ShareOutlined>
    },
    {
        title: 'Collaborate',
        description: 'Collaborating with other developers is a key part of the React development process. Collaboration can help you improve your skills and produce better results.',
        icon: <VolunteerActivismOutlined color="secondary" sx={{ transform: 'scale(4)', my: 7 }}></VolunteerActivismOutlined>
    },
    {
        title: 'Connect',
        description: 'Our website makes it easy to connect with other React developers around the world. You can search for developers and start building your network.',
        icon: <LanOutlined color="secondary" sx={{ transform: 'scale(4)', my: 7 }}></LanOutlined>
    }
]

export const Cards = () => {
    return (
        <Box id="cards" sx={{ my: { xs: 10, md: 20 } }}>
            <Container sx={{ height: '100%' }}>
                <Typography variant="h1" textAlign={'center'} sx={{ fontWeight: 500 }}>Key Features</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: { xs: 'center', md: 'start' }, flexWrap: 'wrap', py: '50px', gap: '50px', flexDirection: { xs: "column", md: "row" } }}>
                    {details.map((detail) => {
                        return (
                            <Paper elevation={20} sx={{ p: 3, width: '300px', color: 'secondary', display: 'flex', flexDirection: 'column', alignItems: 'center' }} key={detail.title}>
                                {detail.icon}
                                <Typography variant="h4" sx={{ fontWeight: 500 }}>{detail.title}</Typography>
                                <Typography sx={{ fontSize: '1.2rem' }}>{detail.description}</Typography>
                            </Paper>
                        )
                    })}
                </Box>
            </Container >
        </Box >
    )
}
