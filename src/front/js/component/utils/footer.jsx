import { BottomNavigation, Box, Container, Typography } from "@mui/material";
import React, { Component } from "react";
import ReactiveLogoWhite from "../../../img/ReactiveLogoWhite.png"

export const Footer = () => (
	<Box sx={{
	}}>
		<Container>
			<Box component="img" sx={{ width: '50px' }} src={ReactiveLogoWhite}></Box>
		</Container>
	</Box>
);
