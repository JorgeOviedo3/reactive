import { Box, Button, Container, Paper, Typography } from '@mui/material'
import Image from 'mui-image'
import React from 'react'

import ReactiveLogoWhite from "../../../img/ReactiveLogoWhite.png"
import ReactiveShip from "../../../img/ReactiveShip.png"
import ReactiveReceipt from "../../../img/ReactiveReceipt.png"



export const Features = () => {
    return (
        <Box sx={{ mt: "-120px", pt: "120px" }} id="features">
            <Container sx={{ height: '100%', display: 'flex', gap: { xs: 5, md: 1 }, flexDirection: { xs: 'column', md: 'row' } }}>
                <Paper elevation={10} sx={{ width: { xs: '100%', md: '50%' }, background: '#a266e2', height: '500px', borderRadius: 5, p: 3 }}>
                    <Box component="img" sx={{ width: '50px' }} src={ReactiveLogoWhite}></Box>
                    <Typography variant="h2" sx={{ color: 'white', fontWeight: 500, fontSize: { xs: '40px', md: '3.75rem' } }}>An awesome place where you can share your code</Typography>
                    <Button variant="outlined" color="subtlegray">Feed</Button>
                </Paper >
                <Paper elevation={10} sx={{ width: { xs: '100%', md: '25%', height: '500px', borderRadius: '20px' }, overflow: { xs: 'hidden', md: 'visible' } }}>
                    <Box height="40%" sx={{ display: 'flex', justifyContent: 'center' }} >
                        <Image width="350px" height="350px" sx={{}} src={"https://cdn.discordapp.com/attachments/865816064298188833/1080977344942059700/ReactiveClock.svg"}></Image>
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <Typography variant="h4" color="black" sx={{ fontWeight: 500, mt: 15, textAlign: 'center' }}>
                            Save time with ready to use components
                        </Typography>
                    </Box>
                </Paper>
                <Paper elevation={10} sx={{ width: { xs: '100%', md: '25%', height: '500px', borderRadius: "20px" }, overflow: { xs: 'hidden', md: 'visible' } }}>
                    <Box sx={{ p: 1 }}>
                        <Typography variant="h4" color="gray1" sx={{ fontWeight: 500, textAlign: 'center', mt: 1 }}>
                            Increase Reachability
                            <p style={{ color: 'gray', marginTop: "-1px" }}>Code Smart</p>
                        </Typography>
                    </Box>
                    <Box height="40%" sx={{ display: 'flex', justifyContent: 'center' }} >
                        <Box component="img" sx={{ mt: 3, height: '500px' }} src={ReactiveShip}></Box>
                    </Box>
                </Paper>
            </Container >
        </Box >
    )
}
