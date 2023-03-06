import { BottomNavigation, Box, Container, Typography } from "@mui/material";
import React, { Component } from "react";
import ReactiveLogoWhite from "../../../img/ReactiveLogoWhite.png"

export const Footer = () => (
	<Box sx={{
		mt: 5,
		backgroundColor: '#437dff',
		height: '30vh'
	}}>
		<Container>
			<Box component="img" sx={{ width: '50px' }} src={ReactiveLogoWhite}></Box>
		</Container>
	</Box>
);
