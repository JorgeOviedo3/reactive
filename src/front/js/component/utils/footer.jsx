import { BottomNavigation, Box, Container, Typography } from "@mui/material";
import React, { Component } from "react";
import ReactiveLogo from "../../../img/ReactiveLogo.png"

export const Footer = () => (
	<Box>
		<Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 5, gap: 2 }}>
			<Box component="img" sx={{ width: '50px' }} src={ReactiveLogo}></Box>
			<Typography>Made with love by Jorge Oviedo♥</Typography>
		</Container>
	</Box>
);
