import { Box, Container, Typography } from "@mui/material";
import React from "react";
import ReactiveLogo from "../../../img/ReactiveLogo.png"
import { ScrollToTopButton } from "./scrollToTopButton.jsx";

export const Footer = () => (
	<Box sx={{ backgroundColor: '#272727', mt: 10 }}>
		<Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 5, gap: 2 }}>
			<Box component="img" sx={{ width: '50px' }} src={ReactiveLogo}></Box>
			<Typography>Made with love by Jorge Oviedo♥</Typography>
		</Container>
		<ScrollToTopButton />
	</Box>
);
