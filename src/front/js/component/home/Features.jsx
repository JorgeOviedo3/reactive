import { Box, Button, Container, Typography } from '@mui/material'
import Image from 'mui-image'
import React from 'react'

import ReactiveLogoWhite from "../../../img/ReactiveLogoWhite.png"
import ReactiveShip from "../../../img/ReactiveShip.png"
import ReactiveReceipt from "../../../img/ReactiveReceipt.png"



export const Features = () => {
    return (
        <Box sx={{ mt: "-120px", pt: "120px" }} id="features">
            <Container sx={{ height: '100%', display: 'flex', gap: { xs: 5, md: 1 }, flexDirection: { xs: 'column', md: 'row' } }}>
                <Box sx={{ width: { xs: '100%', md: '50%' }, background: '#437dff', height: '500px', borderRadius: 5, overflow: { xs: 'hidden', md: 'visible' } }}>
                    <Box height="30%" sx={{ margin: 5 }}>
                        <Box component="img" sx={{ width: '50px' }} src={ReactiveLogoWhite}></Box>
                        <Typography variant="h2" sx={{ color: 'white', fontWeight: 500, fontSize: { xs: '40px', md: '3.75rem' } }}>A place where you can share your code</Typography>
                    </Box>
                    <Box height="70%" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', overflow: 'visible' }}>
                        <Button variant="contained" color="primary" sx={{ ml: 5, width: '50%' }}>Our Features</Button>
                        <Box component="img" sx={{ mt: 3, width: '200px' }} src={ReactiveReceipt}></Box>
                    </Box>
                </Box >
                <Box sx={{ width: { xs: '100%', md: '25%', background: '#F5F5F5', height: '500px', borderRadius: '20px' }, overflow: { xs: 'hidden', md: 'visible' } }}>
                    <Box height="40%" sx={{ display: 'flex', justifyContent: 'center' }} >
                        <Image width="350px" height="350px" sx={{}} src={"https://cdn.discordapp.com/attachments/865816064298188833/1080977344942059700/ReactiveClock.svg"}></Image>
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <Typography variant="h4" color="black" sx={{ fontWeight: 500, mt: 15, textAlign: 'center' }}>
                            Save time with ready to use components
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ width: { xs: '100%', md: '25%', background: '#F5F5F5', height: '500px', borderRadius: "20px" }, overflow: { xs: 'hidden', md: 'visible' } }}>
                    <Box sx={{ p: 1 }}>
                        <Typography variant="h4" color="black" sx={{ fontWeight: 500, textAlign: 'center', mt: 1 }}>
                            Increase Reachability
                            <p style={{ color: 'gray', marginTop: "-1px" }}>Code Smart</p>
                        </Typography>
                    </Box>
                    <Box height="40%" sx={{ display: 'flex', justifyContent: 'center' }} >
                        <Box component="img" sx={{ mt: 3, height: '500px' }} src={ReactiveShip}></Box>
                    </Box>
                </Box>
            </Container >
        </Box >
    )
}
